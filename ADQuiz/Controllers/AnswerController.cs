using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ADQuiz
{
    [ApiController]
    [Route("[controller]")]
    public class AnswerController : Controller
    {
        private readonly AppDbContext context;

        public AnswerController(AppDbContext context)
        {
            this.context = context;
        }

     

    }
}
