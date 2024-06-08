using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Server.Models.ResponseModels;

namespace Server.Controllers
{
    [ApiController]
    public class AuthenticationController : ControllerBase
    {

        [HttpGet("~/signin")]
        public async Task<IActionResult> SignIn()
        {
            string provider = "Steam";
            // Note: the "provider" parameter corresponds to the external
            // authentication provider choosen by the user agent.
            if (string.IsNullOrWhiteSpace(provider))
            {
                return BadRequest();
            }

            // Instruct the middleware corresponding to the requested external identity
            // provider to redirect the user agent to its own authorization endpoint.
            // Note: the authenticationScheme parameter must match the value configured in Startup.cs
            return Challenge(new AuthenticationProperties { RedirectUri = "http://localhost:3000/" }, provider);
        }

        [HttpGet("~/signout"), HttpPost("~/signout")]
        public IActionResult SignOutCurrentUser()
        {
            // Instruct the cookies middleware to delete the local cookie created
            // when the user agent is redirected from the external identity provider
            // after a successful authentication flow (e.g Google or Facebook).
            return SignOut(new AuthenticationProperties { RedirectUri = "http://localhost:3000/" },
                CookieAuthenticationDefaults.AuthenticationScheme);
        }
        [HttpGet("~/userInfo")]
        public IActionResult GetUserInfo()
        {
            var Claims = HttpContext.User.Claims;
            if (!User.Identity.IsAuthenticated)
            {
                return Ok(new UserInfoModel()
                {
                    IsAuthenticated = false,
                });
            }
            return Ok(new UserInfoModel()
            {
                IsAuthenticated = true,
                UserId= 76561198970753428,
                UserName="КОНАН ДОЙЛ",
                ImageHash= "24263dcade9dcd8fbd1ef5c6472b1377c7df7f36_full.jpg"
            });

        }
    }
}
