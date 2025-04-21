using Commands.Commands.Bot.Auth.Delete;
using Commands.Commands.Bot.Auth.Register;
using Commands.Commands.Bot.Avatar.DeleteAvatar;
using Commands.Commands.Bot.Avatar.UploadAvatar;
using Commands.Commands.Bot.Questions.RemoveQuizStats;
using Commands.Commands.Bot.Questions.SubmitAnswer;
using MediatR;
using Queries.Queries.Bot.Auth;
using Queries.Queries.Bot.Avatar.GetAvatar;
using Queries.Queries.Bot.Posts.GetFeed;
using Queries.Queries.Bot.Qustions.GetNextQuestion;
using Queries.Queries.Bot.Qustions.GetStats;
using Queries.Queries.Bot.Tasks.GetTasks;
using System.Collections.Concurrent;
using Telegram.Bot;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;
using Telegram.Bot.Types.ReplyMarkups;

namespace Synchro.Bot
{
    public class TelegramBotService(string token, IMediator mediator, IConfiguration configuration)
    {
        private TelegramBotClient _botClient = new(token);
        private readonly IMediator _mediator = mediator;
        private readonly IConfiguration configuration = configuration;
        private readonly ConcurrentDictionary<long, RegistrationState> _registrationStates = new();
        private readonly ConcurrentDictionary<long, Guid> _currentQuestionIds = new();


        private enum RegistrationState
        {
            None,
            AwaitingSecretKey,
            AwaitingDeleteConfirmation,
            AwaitingAvatarUpload,
            InQuiz,
        }

        public void Start()
        {
            _botClient.StartReceiving(UpdateHandler, ErrorHandler);
        }

        private Task ErrorHandler(ITelegramBotClient client, Exception exception, CancellationToken cancellationToken)
        {
            Console.WriteLine($"Ошибка: {exception.Message}");
            return Task.CompletedTask;
        }

        private async Task UpdateHandler(ITelegramBotClient client, Update update, CancellationToken cancellationToken)
        {
            if (update.Message == null)
                return;

            long chatId = update.Message.Chat.Id;


            if (_registrationStates.TryGetValue(chatId, out var state3) && state3 == RegistrationState.AwaitingAvatarUpload)
            {
                if (update.Message.Text?.Equals("Выход", StringComparison.OrdinalIgnoreCase) == true)
                {
                    _registrationStates[chatId] = RegistrationState.None;

                    await _botClient.SendMessage(chatId, "Загрузка аватара отменена.", cancellationToken: cancellationToken);
                    return;
                }

                // Проверка: отправлено ли фото
                var photo = update.Message.Photo?.LastOrDefault(); // Самое большое качество

                if (photo != null)
                {
                    var file = await _botClient.GetFile(photo.FileId, cancellationToken);
                    using var stream = new MemoryStream();
                    await _botClient.DownloadFile(file.FilePath!, stream, cancellationToken);
                    stream.Position = 0;

                    // Создаём IFormFile из MemoryStream
                    var fileName = $"{Guid.NewGuid()}.jpg";
                    var formFile = new FormFile(stream, 0, stream.Length, "avatar", fileName)
                    {
                        Headers = new HeaderDictionary(),
                        ContentType = "image/jpeg"
                    };

                    var fileSizeFormatted = FormatFileSize(stream.Length);

                    var result = await _mediator.Send(new UploadAvatarFromBotCommand
                    {
                        TelegramChatId = chatId,
                        File = formFile,
                        Size = fileSizeFormatted,
                    }, cancellationToken);

                    _registrationStates[chatId] = RegistrationState.None;
                    await _botClient.SendMessage(chatId, result.Message!, cancellationToken: cancellationToken);
                }

                else
                {
                    await _botClient.SendMessage(chatId,
                        "🚫 Это не похоже на фото. Пожалуйста, отправьте изображение или нажмите '🚪 Выход'.",
                        replyMarkup: GetExitKeyboard(),
                        cancellationToken: cancellationToken);
                }

                return;
            }


            string messageText = update.Message.Text.Trim();



            // Если пользователь в процессе регистрации
            if (_registrationStates.TryGetValue(chatId, out var state) && state == RegistrationState.AwaitingSecretKey)
            {
                if (messageText.Equals("Выход", StringComparison.OrdinalIgnoreCase))
                {
                    _registrationStates[chatId] = RegistrationState.None;
                    await _botClient.SendMessage(chatId, "Вы вышли из регистрации.", cancellationToken: cancellationToken);
                    return;
                }

                var result = await _mediator.Send(new RegisterUserFromBotCommand { SecretKey = messageText, TelegramChatId = chatId }, cancellationToken);

                if (result.IsSuccessful)
                {
                    _registrationStates[chatId] = RegistrationState.None;

                    await _botClient.DeleteMessage(chatId, update.Message.MessageId, cancellationToken);

                    await _botClient.SendMessage(chatId, result.Message!, cancellationToken: cancellationToken);

                    await SetAuthorizedCommands(chatId, cancellationToken);

                }
                else
                {
                    await _botClient.SendMessage(chatId, "❌ Неверный ключ. Попробуйте снова или нажмите '🚪 Выход'.",
                        replyMarkup: GetExitKeyboard(), cancellationToken: cancellationToken);
                }

                return;
            }

            if (_registrationStates.TryGetValue(chatId, out var state2) && state2 == RegistrationState.AwaitingDeleteConfirmation)
            {
                if (messageText.Equals("✅ Да", StringComparison.OrdinalIgnoreCase))
                {
                    var result = await _mediator.Send(new DeleteUserFromBotCommand { TelegramChatId = chatId }, cancellationToken);
                    _registrationStates[chatId] = RegistrationState.None;

                    await _botClient.SendMessage(chatId, result.Message, cancellationToken: cancellationToken);

                    await SetUnauthorizedCommands(chatId, cancellationToken);

                }
                else if (messageText.Equals("❌ Нет", StringComparison.OrdinalIgnoreCase))
                {
                    _registrationStates[chatId] = RegistrationState.None;
                    await _botClient.SendMessage(chatId, "Удаление отменено.", cancellationToken: cancellationToken);
                }
                else
                {
                    await _botClient.SendMessage(chatId, "Пожалуйста, выберите '✅ Да' или '❌ Нет'.", replyMarkup: GetYesNoKeyboard(), cancellationToken: cancellationToken);
                }

                return;
            }




            bool isLoggedIn = await IsUserLoggedInAsync(chatId, cancellationToken);

            // Обработка команды /register
            if (messageText.Equals("/register", StringComparison.OrdinalIgnoreCase) && !isLoggedIn)
            {
                _registrationStates[chatId] = RegistrationState.AwaitingSecretKey;

                await _botClient.SendMessage(chatId,
                    "🔑 Введите секретный ключ из личного кабинета:",
                    replyMarkup: GetExitKeyboard(),
                    cancellationToken: cancellationToken);

                return;
            }

            // Обработка команды /delete_account
            if (messageText.Equals("/delete_account", StringComparison.OrdinalIgnoreCase))
            {
                _registrationStates[chatId] = RegistrationState.AwaitingDeleteConfirmation;

                await _botClient.SendMessage(chatId,
                    "⚠️ Вы уверены, что хотите удалить аккаунт? Это действие необратимо.",
                    replyMarkup: GetYesNoKeyboard(),
                    cancellationToken: cancellationToken);
                return;
            }

            // Остальные команды


            if (!isLoggedIn)
            {
                await _botClient.SendMessage(chatId, "🔐 Вы не авторизированы. Зарегистрируйтесь при помощи команды /register.", cancellationToken: cancellationToken);

                await SetUnauthorizedCommands(chatId, cancellationToken);
                return;
            }

            await SetAuthorizedCommands(chatId, cancellationToken);

            if (_registrationStates.TryGetValue(chatId, out var quizState) && quizState == RegistrationState.InQuiz)
            {
                if (messageText.Equals("Выход", StringComparison.OrdinalIgnoreCase) || messageText.Equals("🚪 Выход", StringComparison.OrdinalIgnoreCase))
                {
                    _registrationStates[chatId] = RegistrationState.None;
                    await _botClient.SendMessage(chatId, "🚪 Вы вышли из викторины.", cancellationToken: cancellationToken);
                    return;
                }

                _currentQuestionIds.TryGetValue(chatId, out var currentQuestionId);

                var result = await _mediator.Send(new SubmitQuizAnswerCommand
                {
                    TelegramChatId = chatId,
                    Answer = messageText,
                    QuestionId = currentQuestionId,
                }, cancellationToken);

                if (result.IsCorrect)
                {
                    await _botClient.SendMessage(chatId, "✅ Верно!", cancellationToken: cancellationToken);
                }
                else
                {
                    await _botClient.SendMessage(chatId, $"❌ Неверно. Правильный ответ: {result.CorrectAnswer}", cancellationToken: cancellationToken);
                }

                await SendNextQuizQuestion(chatId, result.HasNextQuestion, cancellationToken);
                return;
            }


            await SendCommand(chatId, messageText, cancellationToken);
        }

        private ReplyKeyboardMarkup GetExitKeyboard()
        {
            return new ReplyKeyboardMarkup(
            [
            [new KeyboardButton("Выход")]
        ])
            {
                ResizeKeyboard = true,
                OneTimeKeyboard = true
            };
        }

        private ReplyKeyboardMarkup GetYesNoKeyboard()
        {
            return new ReplyKeyboardMarkup(
            [
                [new KeyboardButton("✅ Да"), new KeyboardButton("❌ Нет")]
            ])
            {
                ResizeKeyboard = true,
                OneTimeKeyboard = true
            };
        }


        private async Task<bool> IsUserLoggedInAsync(long chatId, CancellationToken cancellationToken)
        {
            var query = new IsUserLoggedInQuery { TelegramChatId = chatId };

            var result = await _mediator.Send(query, cancellationToken);

            return result != null;
        }

        public async Task SendCommand(long chatId, string messageText, CancellationToken cancellationToken)
        {
            //await _botClient.SendMessage(chatId, $"Вы написали: {messageText}", cancellationToken: cancellationToken);

            if (messageText.Equals("/get_avatar", StringComparison.OrdinalIgnoreCase))
            {
                var result = await _mediator.Send(new GetAvatarForBotQuery { TelegramChatId = chatId }, cancellationToken);

                if (result.IsSuccessful && result.Url == null)
                {
                    await _botClient.SendMessage(chatId, result.Message!, cancellationToken: cancellationToken);
                }

                if (result.IsSuccessful)
                {
                    await _botClient.SendPhoto(chatId, photo: result.Url!, "Ваш текущий аватар:", cancellationToken: cancellationToken);
                }

                return;
            }

            if (messageText.Equals("/upload_avatar", StringComparison.OrdinalIgnoreCase))
            {
                _registrationStates[chatId] = RegistrationState.AwaitingAvatarUpload;

                await _botClient.SendMessage(chatId,
                    "📸 Пожалуйста, отправьте фото для аватара.\nИли нажмите '🚪 Выход', чтобы отменить.",
                    replyMarkup: GetExitKeyboard(),
                    cancellationToken: cancellationToken);

                return;
            }

            if (messageText.Equals("/delete_avatar", StringComparison.OrdinalIgnoreCase))
            {
                var result = await _mediator.Send(new DeleteAvatarFromBotCommand { TelegramChatId = chatId }, cancellationToken);

                await _botClient.SendMessage(chatId, result.Message!, cancellationToken: cancellationToken);
                return;
            }

            if (messageText.Equals("/get_my_tasks", StringComparison.OrdinalIgnoreCase))
            {
                var result = await _mediator.Send(new GetTasksForBotQuery { TelegramChatId = chatId }, cancellationToken);

                await _botClient.SendMessage(chatId, result, parseMode: ParseMode.Html, cancellationToken: cancellationToken);
                return;
            }

            if (messageText.Equals("/delete_stats", StringComparison.OrdinalIgnoreCase))
            {
                await _mediator.Send(new RemoveQuizStatsCommand { TelegramChatId = chatId }, cancellationToken);

                await _botClient.SendMessage(chatId, "Статистика викторины обнулена.", cancellationToken: cancellationToken);
                return;
            }

            if (messageText.Equals("/get_stats", StringComparison.OrdinalIgnoreCase))
            {
                var result = await _mediator.Send(new GetQuizStatsQuery { TelegramChatId = chatId }, cancellationToken);

                await _botClient.SendMessage(chatId, result, parseMode: ParseMode.Html, cancellationToken: cancellationToken);
                return;
            }

            if (messageText.Equals("/daily_feed", StringComparison.OrdinalIgnoreCase))
            {
                var result = await _mediator.Send(new GetDailyFeedForBotQuery { TelegramChatId = chatId }, cancellationToken);

                await _botClient.SendMessage(chatId, result, parseMode: ParseMode.Html, cancellationToken: cancellationToken);
                return;
            }

            if (messageText.Equals("/start_quiz", StringComparison.OrdinalIgnoreCase))
            {
                _registrationStates[chatId] = RegistrationState.InQuiz;

                await SendNextQuizQuestion(chatId, true, cancellationToken);
                return;
            }

        }

        private async Task SetUnauthorizedCommands(long chatId, CancellationToken cancellationToken)
        {
            await _botClient.SetMyCommands(
                [
                    new BotCommand { Command = "register", Description = "Зарегистрироваться" },
                ], scope: new BotCommandScopeChat { ChatId = chatId }, cancellationToken: cancellationToken);
        }

        private async Task SetAuthorizedCommands(long chatId, CancellationToken cancellationToken)
        {
            await _botClient.SetMyCommands(
            [
                new BotCommand { Command = "get_avatar", Description = "🖼️ Посмотреть аватар" },
                new BotCommand { Command = "upload_avatar", Description = "📤 Загрузить аватар" },
                new BotCommand { Command = "delete_avatar", Description = "🗑️ Удалить аватар" },
                new BotCommand { Command = "get_my_tasks", Description = "📋 Мои таски" },
                new BotCommand { Command = "daily_feed", Description = "📰 Лента за сегодня" },
                new BotCommand { Command = "start_quiz", Description = "🧠 Начать викторину" },
                new BotCommand { Command = "get_stats", Description = "📊 Показать статистику" },
                new BotCommand { Command = "delete_stats", Description = "🧹 Обнулить викторину" },
                new BotCommand { Command = "delete_account", Description = "⚠️ Удалить аккаунт" },
            ], scope: new BotCommandScopeChat { ChatId = chatId }, cancellationToken: cancellationToken);
        }

        private async Task SendNextQuizQuestion(long chatId, bool hasNextQuestion, CancellationToken cancellationToken)
        {
            QuizQuestionDto question = null;

            if (hasNextQuestion)
            {
                question = await _mediator.Send(new GetNextQuizQuestionQuery { TelegramChatId = chatId }, cancellationToken);
            }

            if (question == null || !hasNextQuestion)
            {
                _registrationStates[chatId] = RegistrationState.None;
                await _botClient.SendMessage(chatId, "❌ На данный момент нет доступных вопросов.", cancellationToken: cancellationToken);
                return;
            }

            _currentQuestionIds[chatId] = question.Id;

            var keyboard = question.Options.Select(o => new[] { new KeyboardButton(o) }).ToList();
            keyboard.Add(new[] { new KeyboardButton("🚪 Выход") });

            var replyMarkup = new ReplyKeyboardMarkup(keyboard)
            {
                ResizeKeyboard = true,
                OneTimeKeyboard = true
            };

            if (!string.IsNullOrEmpty(question.Image))
            {
                await _botClient.SendPhoto(chatId, question.Image, question.Text, replyMarkup: replyMarkup, cancellationToken: cancellationToken);
            }
            else
            {
                await _botClient.SendMessage(chatId, $"❓ {question.Text}", replyMarkup: replyMarkup, cancellationToken: cancellationToken);
            }
        }


        private static string FormatFileSize(long bytes)
        {
            var sizes = new[] { "B", "KB", "MB", "GB" };
            double len = bytes;
            int order = 0;
            while (len >= 1024 && order < sizes.Length - 1)
            {
                order++;
                len /= 1024;
            }

            return $"{len:0.##} {sizes[order]}";
        }

    }
}
