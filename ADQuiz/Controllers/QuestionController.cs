using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ADQuiz
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionController : Controller
    {
        private AppDbContext context;
        public QuestionController(AppDbContext context)
        {
            this.context = context;
        }

        [HttpPost]
        [IgnoreAntiforgeryToken]
        public IActionResult AddQuestion([FromBody]AddQuestionModel modelQuestion)
        {
            var correctAnswerId = Guid.NewGuid().ToString();
            context.Questions.Add(new Question
            {
                Id = Guid.NewGuid().ToString(),
                QuestionText = modelQuestion.Question,
                Difficulty = modelQuestion.Difficulty,
                Category = modelQuestion.Category,
                CorrectAnswerId = correctAnswerId,
                Answers = new List<Answer> {
                    new Answer { Id = correctAnswerId, AnswerText = modelQuestion.CorrectAnswer },
                    new Answer{ Id = Guid.NewGuid().ToString(), AnswerText = modelQuestion.WrongAnswerOne },
                    new Answer{ Id = Guid.NewGuid().ToString(), AnswerText = modelQuestion.WrongAnswerTwo },
                    new Answer{ Id = Guid.NewGuid().ToString(), AnswerText = modelQuestion.WrongAnswerThree }}
                

            });
            context.SaveChanges();
            return Ok();
        }

    }
}
