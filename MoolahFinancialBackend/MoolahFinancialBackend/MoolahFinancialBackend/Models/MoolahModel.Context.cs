﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class MoolahEntities : DbContext
    {
        public MoolahEntities()
            : base("name=MoolahEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<transaction> transactions { get; set; }
        public virtual DbSet<user_tag> user_tag { get; set; }
        public virtual DbSet<holding> holdings { get; set; }
        public virtual DbSet<news> news { get; set; }
        public virtual DbSet<address> addresses { get; set; }
        public virtual DbSet<user> users { get; set; }
        public virtual DbSet<portfolio> portfolios { get; set; }
        public virtual DbSet<question> questions { get; set; }
        public virtual DbSet<tag> tags { get; set; }
    }
}
