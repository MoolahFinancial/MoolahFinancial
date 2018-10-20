using System;

namespace moolahFinancialAPI.Models
{
  public class Portfolio
  {
    public int PortfolioId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public int Risk { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public bool[] Photo { get; set; }
  }
}
