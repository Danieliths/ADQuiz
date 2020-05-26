using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ADQuiz.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;

namespace ADQuiz
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : Controller
    {
        public AccountController(IMapper autoMapper, Context context)
        {
            this.autoMapper = autoMapper;
            this.context = context;
        }

        private readonly IMapper autoMapper;
        private readonly Context context;
        [HttpPost("register")]
        [ValidateAntiForgeryToken]
        public IActionResult Register([FromBody]UserRegistrationModel userModel)
        {
            var user = autoMapper.Map<User>(userModel);
            if (context.Users.Any(u => u.UserName == user.UserName))
            {
                return Conflict("Username is taken");
            }
            context.Users.Add(user);
            context.SaveChanges();
            return Ok();
        }
    }
}

