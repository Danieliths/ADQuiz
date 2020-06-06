using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ADQuiz
{
    public class HighscoreHttpResponse
    {
        public string UserName { get; set; }
        public int HighScore { get; set; }
        public DateTime HighScoreTime { get; set; }
    }
}
