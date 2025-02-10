using Commands.Commands.Auth.ChangePassword;
using Commands.Commands.Auth.Login;
using Commands.Commands.Auth.Registration;
using Core.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Synchro.Identity;

namespace Synchro.Controllers.Auth
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController(
        IMediator mediator,
        SignInManager<User> signInManager) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;
        private readonly SignInManager<User> _signInManager = signInManager;

        [HttpPost("signup")]
        public async Task<IActionResult> RegisterUser([FromBody] RegistrationCommand command)
        {
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpPost("signin")]
        public async Task<IActionResult> Login([FromBody] LoginCommand command)
        {
            var userIdString = await _mediator.Send(command);

            var encodedToken = JwtHandler.GenerateToken(Guid.Parse(userIdString));

            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Token = encodedToken });
        }

        [HttpPost]
        [Route("signout")]
        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }

        [HttpPost]
        [Route("password-reset")]
        public async Task<IActionResult> ChangePassword(ChangePasswordCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }
    }
}
