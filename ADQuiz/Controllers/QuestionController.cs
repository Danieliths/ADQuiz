using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            context.Questions.Add(new Question
            {
                Id = Guid.NewGuid().ToString(),
                QuestionText = modelQuestion.Question,
                Difficulty = modelQuestion.Difficulty,
                Category = modelQuestion.Category,
                CorrectAnswer = modelQuestion.CorrectAnswer,
                Answers = new List<Answer> {
                    new Answer { Id = Guid.NewGuid().ToString(), AnswerText = modelQuestion.CorrectAnswer },
                    new Answer{ Id = Guid.NewGuid().ToString(), AnswerText = modelQuestion.WrongAnswerOne },
                    new Answer{ Id = Guid.NewGuid().ToString(), AnswerText = modelQuestion.WrongAnswerTwo },
                    new Answer{ Id = Guid.NewGuid().ToString(), AnswerText = modelQuestion.WrongAnswerThree }
                }
                

            });
            context.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Authorize(Roles = "Administrator")]
        [IgnoreAntiforgeryToken]
        [Route("{id}")]
        public IActionResult UpdateQuestion([FromBody] AddQuestionModel modelQuestion, string id)
        {
            var questionToUpdate = context.Questions.Include(a => a.Answers).Single(q => q.Id == id);
            var answers = questionToUpdate.Answers.ToList();

            answers[0].AnswerText = modelQuestion.CorrectAnswer;
            answers[1].AnswerText = modelQuestion.WrongAnswerOne;
            answers[2].AnswerText = modelQuestion.WrongAnswerTwo;
            answers[3].AnswerText = modelQuestion.WrongAnswerThree;
   
            context.Answers.UpdateRange(answers);
            questionToUpdate.CorrectAnswer = modelQuestion.CorrectAnswer;
            questionToUpdate.QuestionText = modelQuestion.Question;
            context.Questions.Update(questionToUpdate);
            context.SaveChanges();
            return Ok();
        }


       [HttpGet]
       [Authorize]
       [IgnoreAntiforgeryToken]
       public IEnumerable<QuestionHttpResponse> GetQuestions()
       {
           return context.Questions.Include(a => a.Answers).Select(q => mapper.Map<QuestionHttpResponse>(q)).ToList();
       }

        [HttpGet]
        [Authorize]
        [IgnoreAntiforgeryToken]
        [Route("{id}")]
        public Question CheckAnswer(string id)
        {
            return context.Questions.Include(a => a.Answers).Single(q => q.Id == id);
        }

        [HttpDelete]
        [Authorize(Roles = "Administrator")]
        [IgnoreAntiforgeryToken]
        [Route("{id}")]
        public IActionResult DeleteAnswer(string id)
        {
           
            var questionToRemove = context.Questions.Include(a => a.Answers).Single(q => q.Id == id);
            context.Questions.Remove(questionToRemove);
            context.SaveChanges();
            return NoContent();
        }
    }
}
