﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TeduShop.Model.Abstract
{
    public abstract class Auditable : IAuditable
    {
       public DateTime? CreatedDate { get; set; }
       public string CreatedBy { get; set; }
       public DateTime? UpdatedDate { get; set; }
       public string UpdatedBy { get; set; }
       public string MetaKeyword { get; set; }
       public string MetaDescription { get; set; }
       public bool Status { get; set; }
    }
}
