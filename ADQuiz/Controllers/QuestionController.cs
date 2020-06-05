using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ADQuiz
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionController : Controller
    {
        private AppDbContext context;
        private IMapper mapper;

        public QuestionController(AppDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
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


       [HttpGet]
       [IgnoreAntiforgeryToken]
       public IEnumerable<object> GetQuestions()
       {
           return context.Questions.Include(a => a.Answers).Select(q => mapper.Map<QuestionHttpResponse>(q)).ToList();
       }

        [HttpGet]
        [IgnoreAntiforgeryToken]
        [Route("{id}")]
        public IActionResult CheckAnswer(string id)
        {
            var answer = context.Questions.Single(q => q.Id == id);
           
            return Ok(new { correctAnswer = answer.CorrectAnswerId });
        }
    }
}
