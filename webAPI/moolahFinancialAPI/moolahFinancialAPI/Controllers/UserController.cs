using moolahFinancialAPI.Models;
using moolahFinancialAPI.Rest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace moolahFinancialAPI.Controllers
{
  public class UserController : ApiController
  {
    // GET: api/Users
    public GetUserByIdResponse GetUserById(GetUserByIdRequest request)
    {
      var response = new GetUserByIdResponse();




      return response;
    }
  }
}
