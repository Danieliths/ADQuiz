﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

namespace ADQuiz
{
    [ApiController]
    [Route("[controller]")]
    public class HighscoreController : Controller
    {
        private  AppDbContext context;
        private  UserManager<User> userManager;
        private IMapper mapper;

        public HighscoreController(AppDbContext context, UserManager<User> userManager, IMapper mapper)
        {
            this.context = context;
            this.userManager = userManager;
            this.mapper = mapper;
        }
        
        [HttpPost]
        [IgnoreAntiforgeryToken]
        public IActionResult SetHighScore([FromBody]SetHighScoreRequest HighScoreModel)
        {

            var user = userManager.GetUserAsync(User).Result;

            if(user != null)
            {
                if(HighScoreModel.Score > user.HighScore)
                {
                    user.HighScore = HighScoreModel.Score;
                    context.Users.Update(user);
                    context.SaveChanges();
                }
            }
            return Ok();
        }
        
        [HttpGet]
        [IgnoreAntiforgeryToken]
        public IEnumerable<object> GetHighScore()
        {
            return context.Users.OrderByDescending(o => o.HighScore).Select(q => mapper.Map<HighscoreHttpResponse>(q)).ToList();
        }

    }
}
