using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace moolahFinancialAPI.Models
{
  public class News
  {
    public int PortfolioId { get; set; }
    public int NewsId { get; set; }
    public string Title { get; set; }
    public DateTime TimeOfStory { get; set; }
    public string Author { get; set; }
    public string Source { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string ArticleUrl { get; set; }
    public string Content { get; set; }
  }
}
