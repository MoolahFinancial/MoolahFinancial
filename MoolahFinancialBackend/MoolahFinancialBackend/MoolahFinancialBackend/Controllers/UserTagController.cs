using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MoolahFinancialBackend.Models;

namespace MoolahFinancialBackend.Controllers
{
    /// <summary>
    /// The User Tag Controller class.
    /// Contains all APIs for interacting with the UserTag junction table
    /// </summary>
    [RoutePrefix("api/users")]
    public class UserTagController : ApiController
    {
        private MoolahEntities db = new MoolahEntities();

        /// <summary>  
        /// Returns the number of tags a user has (number of questions a user has answered)
        /// </summary>  
        /// <param name="userId">  </param>  
        /// <returns></returns> 
        [HttpGet]
        [Route("GetNumQuestionsAnswered/{userId:int:min(1)}")]
        [ResponseType(typeof(user_tag))]      
        public IHttpActionResult GetNumQuestionsAnswered(int userId)
        {
            // If the user does not exist, return an error
            if(!UserExists(userId))
            {
                return NotFound();
            }

            int numQuestions = NumUserTags(userId);

            return Ok(numQuestions);
        }

        // Helper method to see how many tags belonging with a specific user exist
        private int NumUserTags(int id)
        {
            return db.user_tag.Count(e => e.user_id == id);
        }

        // Checks if a given user exists
        private bool UserExists(int id)
        {
            return db.users.Count(e => e.user_id == id) > 0;
        }
    }
}