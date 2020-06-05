using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ADQuiz
{
    public class QuestionHttpResponse
    {
        public string Id { get; set; }
        public string Category { get; set; }
        public string Difficulty { get; set; }
        public string QuestionText { get; set; }
        public virtual ICollection<Answer> Answers { get; set; }
    }
}
