using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ADQuiz
{
    [ApiController]
    public class AccountController : Controller
    {
        private UserManager<User> userManager;
        private SignInManager<User> signInManager;
        private IAntiforgery antiForgery;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IAntiforgery antiForgery)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.antiForgery = antiForgery;
        }

        [HttpPost]
        [IgnoreAntiforgeryToken]
        [Route("/login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await signInManager.PasswordSignInAsync(request.Email, request.Password, false, false);
            if (result.Succeeded)
            {
                var tokens = antiForgery.GetAndStoreTokens(HttpContext);
                Response.Cookies.Append("XSRF-REQUEST-TOKEN", tokens.RequestToken, new Microsoft.AspNetCore.Http.CookieOptions
                {
                    HttpOnly = false
                });
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        [IgnoreAntiforgeryToken]
        [Route("/register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var user = new User { UserName = request.Email };
            var result = await userManager.CreateAsync(user, request.Password );
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, request.Role);
                return Ok();
            }
            return BadRequest();
        }
        [HttpGet]
        [IgnoreAntiforgeryToken]
        [Route("/logout")]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok(new { success = true });
        }
        [HttpGet]
        [IgnoreAntiforgeryToken]
        [Route("/loggedin")]
        public IActionResult Status()
        {
            if (User.Identity.IsAuthenticated)
                return Ok();

            return Unauthorized();
        }
    }
}
