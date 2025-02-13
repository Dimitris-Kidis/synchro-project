﻿using AutoMapper;
using Core.Domain.Entities;
using Queries.DTOs;

namespace Queries.MapperProfiles
{
    public class WebContentProfile : Profile
    {
        public WebContentProfile()
        {
            CreateMap<WebContent, WebContentDto>();
        }
    }
}
