using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ADQuiz
{
    [ApiController]
    [Route("[controller]")]
    public class HighscoreController : Controller
    {
        private  AppDbContext context;
        private  UserManager<User> userManager;

        public HighscoreController(AppDbContext context, UserManager<User> userManager)
        {
            this.context = context;
            this.userManager = userManager;
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

    }
}
