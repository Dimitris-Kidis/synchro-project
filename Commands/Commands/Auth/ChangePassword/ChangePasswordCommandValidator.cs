using Commands.Commands.Auth.ChangePassword;
using FluentValidation;

namespace Command.Auth.ChangePassword
{
    public class ChangePasswordCommandValidator : AbstractValidator<ChangePasswordCommand>
    {
        public ChangePasswordCommandValidator()
        {

            RuleFor(user => user.OldPassword)
                .NotEmpty()
                .MinimumLength(8)
                .MaximumLength(20)
                .Matches("[A-Z]").WithMessage("'Password' must contain one or more capital letters.")
                .Matches("[a-z]").WithMessage("'Password' must contain one or more lowercase letters.")
                .Matches(@"\d").WithMessage("'Password' must contain one or more digits.")
                .Matches(@"[][""!@$%^&*(){}:;<>,.?/+_=|'~\\-]").WithMessage("'Password' must contain one or more special characters.");

            RuleFor(user => user.NewPassword)
                .NotEmpty()
                .MinimumLength(8)
                .MaximumLength(20)
                .Matches("[A-Z]").WithMessage("'Password' must contain one or more capital letters.")
                .Matches("[a-z]").WithMessage("'Password' must contain one or more lowercase letters.")
                .Matches(@"\d").WithMessage("'Password' must contain one or more digits.")
                .Matches(@"[][""!@$%^&*(){}:;<>,.?/+_=|'~\\-]").WithMessage("'Password' must contain one or more special characters.");
        }
    }
}
