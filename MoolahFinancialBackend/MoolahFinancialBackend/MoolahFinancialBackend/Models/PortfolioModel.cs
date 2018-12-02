using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MoolahFinancialBackend.Models
{
  public class PortfolioModel
  {
    public int PortfolioID { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public int IsActive { get; set; }
    public int IsDeleted { get; set; }
    public byte[] Photo { get; set; }
    public decimal ExpectedReturn { get; set; }
    public decimal Risk { get; set; }
  }
}
