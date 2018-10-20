using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace moolahFinancialAPI.Models
{
  public class User
  {
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string MiddleName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Citizenship { get; set; }
    public int NotificationPreference { get; set; }
    public int SSN { get; set; }
    public string PrimaryPhone { get; set; }
    public string SecondaryPhone { get; set; }
    public bool IsDeleted { get; set; }
  }
}
