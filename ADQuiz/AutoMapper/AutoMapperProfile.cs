using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ADQuiz.Models;
using AutoMapper;
namespace ADQuiz.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserRegistrationModel>();
        }
    }
}
