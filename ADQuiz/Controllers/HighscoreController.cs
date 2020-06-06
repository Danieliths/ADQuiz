using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

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
        [Authorize(Roles = "User, Administrator")]
        public IActionResult SetHighScore([FromBody]SetHighScoreRequest HighScoreModel)
        {

            var user = userManager.GetUserAsync(User).Result;

            if(user != null)
            {
                if(HighScoreModel.Score > user.HighScore)
                {
                    user.HighScore = HighScoreModel.Score;
                    user.HighScoreTime = DateTime.Now.Year + "/" + DateTime.Now.Month + "/" + DateTime.Now.Day + "  " + DateTime.Now.Hour + ":" + DateTime.Now.Minute + ":" + DateTime.Now.Second;
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
            return context.Users.OrderByDescending(o => o.HighScore).ThenBy(o => o.HighScoreTime).Select(q => mapper.Map<HighscoreHttpResponse>(q)).ToList();
        }

    }
}
