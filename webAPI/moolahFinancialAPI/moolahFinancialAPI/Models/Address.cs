
namespace moolahFinancialAPI.Models
{
  public class Address
  {
    public int UserId { get; set; }
    public int AddressId { get; set; }
    public string FirstLine { get; set; }
    public string SecondLine { get; set; }
    public string SuiteNumber { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string PostalCode { get; set; }
    public bool IsDeleted { get; set; }
  }
}
