using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ADQuiz
{
    public class AuttoMappingProfile : Profile
    {
        public AuttoMappingProfile()
        {
            CreateMap<Question, QuestionHttpResponse>().ForMember(dest => dest.QuestionText, opt => opt.MapFrom(src => src.QuestionText))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
                .ForMember(dest => dest.Difficulty, opt => opt.MapFrom(src => src.Difficulty))
                .ForMember(dest => dest.Answers, opt => opt.MapFrom(src => src.Answers))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));

            CreateMap<User, HighscoreHttpResponse>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.HighScore, opt => opt.MapFrom(src => src.HighScore));
                
        }
    }
}
