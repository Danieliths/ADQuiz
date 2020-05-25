using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ADQuiz
{
    public class User : IdentityUser
    {
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
    }
}
