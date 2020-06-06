using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ADQuiz
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
        public int HighScore { get; set; }
        public DateTime HighScoreTime { get; set; }
    }
}
