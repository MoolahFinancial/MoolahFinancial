using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace moolahFinancialAPI.Database
{
  public class BaseDb
  {
    static void Main(string[] args)
    {
      try
      {
        SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
        //TODO: Move these to WebApiConfig for security
        builder.DataSource = "your_server.database.windows.net";
        builder.UserID = "your_user";
        builder.Password = "your_password";
        builder.InitialCatalog = "your_database";

        using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
        {
          connection.Open();

        }
      }
      catch (SqlException e)
      {
        Console.WriteLine(e.ToString());
      }
      Console.ReadLine();
    }

    void ExecuteStoredProcedure(string Sproc, List<SqlParameter> parameters)
    {
      try
      {

      }
      catch (SqlException e)
      {

      }
    }
  }
}
