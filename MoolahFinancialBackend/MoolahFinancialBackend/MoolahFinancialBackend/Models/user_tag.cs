//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MoolahFinancialBackend.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class user_tag
    {
        public Nullable<int> question_id { get; set; }
        public int user_id { get; set; }
        public int tag_id { get; set; }
        public string question_answer { get; set; }
    
        public virtual user user { get; set; }
        public virtual question question { get; set; }
        public virtual tag tag { get; set; }
    }
}
