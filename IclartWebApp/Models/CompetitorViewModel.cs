﻿using IclartWebApp.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IclartWebApp.Models
{
    public class CompetitorViewModel
    {
        public MessageResult<CompetitorModel> CompetitorList { get; set; }
    }
}