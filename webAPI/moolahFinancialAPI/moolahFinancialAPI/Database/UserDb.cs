using moolahFinancialAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace moolahFinancialAPI.Database
{
  public class UserDb : BaseDb
  {
    public static User GetUserByIdDB(int userId)
    {
      User bob = new User()
      {
        UserId = 1,
        FirstName = "Bob",
        MiddleName = "Newton",
        LastName = "Jones",
        Email = "Bob@gmail.com",
        Password = "1234",
        DateOfBirth = new DateTime(2012, 1, 1),
        Citizenship = "USA",
        NotificationPreference = 1,
        SSN = 111111111,
        PrimaryPhone = "2054322222",
        SecondaryPhone = "2033322222",
        IsDeleted = false
      };

      return bob;
    }
  }
}
