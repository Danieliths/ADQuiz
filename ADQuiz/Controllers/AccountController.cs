using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ADQuiz.Models;
using AutoMapper;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;

namespace ADQuiz
{
    [ApiController]
    [Route("controller")]
    public class AccountController : Controller
    {
        public AccountController(IMapper autoMapper, Context context, SignInManager<User> signInManager, IAntiforgery antiForgery, UserManager<User> userManager)
        {
            this.autoMapper = autoMapper;
            this.context = context;
            this.signInManager = signInManager;
            this.antiForgery = antiForgery;
            this.userManager = userManager;
        }

        private readonly IMapper autoMapper;
        private readonly Context context;
        private readonly SignInManager<User> signInManager;
        private readonly IAntiforgery antiForgery;
        private readonly UserManager<User> userManager;

        [HttpPost]
        [IgnoreAntiforgeryToken]
        [Route("/register")]
        public async Task<IActionResult> RegisterAsync([FromBody]UserRegistrationModel userModel)
        {
            var result = await userManager.CreateAsync(new User { UserName = userModel.UserName }, userModel.Password);

            if(result.Succeeded)
            return Ok();

            foreach (var error in result.Errors)
            {
                if(error.Code.Equals("409") )
                {
                    return Conflict(error.Description);
                }
            }
            return BadRequest();
        }

    }
}

