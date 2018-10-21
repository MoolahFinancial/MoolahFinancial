using moolahFinancialAPI.Database;
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
  [RoutePrefix("api/user")]
  public class UserController : ApiController
  {
    [Route("GetUserById/{UserId}", Name = "GetUserById")]
    public GetUserByIdResponse GetUserById(int UserId)
    {
      var response = new GetUserByIdResponse();

      response.User = UserDb.GetUserByIdDB(UserId);

      return response;
    }

    //[Route("GetUserById/{request.UserId}", Name = "GetUserById")]
    //public GetUserByIdResponse GetUserById(GetUserByIdRequest request)
    //{
    //  var response = new GetUserByIdResponse();

    //  response.User = UserDb.GetUserByIdDB(request.UserId);

    //  return response;
    //}
  }
}
