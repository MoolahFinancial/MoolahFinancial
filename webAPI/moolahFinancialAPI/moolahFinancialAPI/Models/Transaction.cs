using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace moolahFinancialAPI.Models
{
  public class Transaction
  {
    public int UserId { get; set; }
    public int PortfolioId { get; set; }
    public int TransactionId { get; set; }
    public DateTime InvestmentTime { get; set; }
    public Decimal InvestmentAmount { get; set; }
    public bool IsSale { get; set; }
  }
}
