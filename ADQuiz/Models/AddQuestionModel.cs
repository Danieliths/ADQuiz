using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ADQuiz.Models
{
    public class AddQuestionModel
    {
        public string Question { get; set; }
        public string CorrectAnswer { get; set; }
        public string WrongAnswerOne { get; set; }
        public string WrongAnswerTwo { get; set; }
        public string WrongAnswerThree { get; set; }
        public string Difficulty { get; set; }
        public string Category { get; set; }
    }
}
