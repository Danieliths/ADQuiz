﻿using Newtonsoft.Json;

namespace ADQuiz
{
    public class Answer
    {
        public string Id { get; set; }
        public string AnswerText { get; set; }
        [JsonIgnore]
        public Question Question { get; set; }
    }
}