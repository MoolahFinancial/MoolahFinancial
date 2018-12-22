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
    //TODO: Create a token upon logging in. Make token required for each API

    /// <summary>
    /// The User Controller class.
    /// Contains all APIs for interacting with the User table.
    /// </summary>
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        private MoolahEntities db = new MoolahEntities();

        /// <summary>  
        /// Returns all of the users stored in the database (both deleted an non-deleted users)
        /// </summary> 
        [HttpGet]
        [Route("")]
        public IQueryable<user> GetAllUsers()
        {
            return db.users;
        }

        /// <summary>  
        /// Returns all active users in the database (non-deleted users)
        /// </summary> 
        [HttpGet]
        [Route("activeUsers")]
        public IQueryable<user> GetAllActiveUsers()
        { 
            return db.users.Where(c => c.is_deleted == false);
        }

        /// <summary>  
        /// Returns a given user based on the passed in id.
        /// </summary>  
        /// <param name="id">The user id to search for </param>  
        /// <returns></returns> 
        [HttpGet]
        [ResponseType(typeof(user))]
        [Route("{id:int:min(1)}")]
        public IHttpActionResult GetUser(int id)
        {
            user user = db.users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        /// <summary>  
        /// Sets an existing user as being deleted. This API doesn't delete a user from the table
        /// but sets is_deleted as being true (don't want to actually delete users).
        /// </summary>  
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut]
        [ResponseType(typeof(void))]
        [Route("deactivate/{id:int:min(1)}")]
        public IHttpActionResult DeactivateUser(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            user user = db.users.Find(id);

            user.is_deleted = true;

            db.SaveChanges();

            // Returns a 200 http status with a success message
            return Ok(new { success = true, message = "Account sucessfully deactivated." });
        }

        /// <summary>  
        /// Updates the data for an existing user.
        /// </summary>  
        /// <param name="id"></param>  
        /// <param name="user"></param> 
        /// <returns></returns> 
        [HttpPut]
        [ResponseType(typeof(void))]
        [Route("edit/{id:int:min(1)}")]
        public IHttpActionResult PutUser(int id, user user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.user_id)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        /*
         * TODO: CHANGE date_of_birth to be nullable or initialize it 
         * (vs uses 01/01/1000 while sql server uses 1753-01-01 00:00:00 as the min default date)
         * More info: https://stackoverflow.com/questions/4608734/the-conversion-of-a-datetime2-data-type-to-a-datetime-data-type-resulted-in-an-o
         * SqlException: The conversion of a datetime2 data type to a datetime data type resulted in an out-of-range value.
         * The statement has been terminated.
         *
         */
        /// <summary>  
        /// Creates a new user
        /// </summary>
        /// <param name="user"></param> 
        /// <returns></returns>
        [HttpPost]
        [Route("register", Name = "RegisterUser")]
        [ResponseType(typeof(user))]
        public IHttpActionResult RegisterUser(user user)
        {
            // Return an error message if the email already belongs to a different user
            if(db.users.Any(c => c.email == user.email))
            {
                // Returns a HTTP 409 Conflict error to explain it's a conflict error
                return Conflict();
            }

            db.users.Add(user);
            db.SaveChanges();

            user = db.users.FirstOrDefault(c => c.email == user.email);

            return Ok(new { success = true, message = "Successfully created the user account", user });
        }

        //[HttpPost]
        //[Route("fsdafaaffd", Name = "afdfadsfdf")]
        //[ResponseType(typeof(user))]
        //public IHttpActionResult RegisterUser2(user user)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.users.Add(user);

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (UserExists(user.user_id))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtRoute("DefaultApi", new { id = user.user_id }, user);
        //}

        //// DELETE
        //[HttpDelete]
        //[Route("api/Users/delete/{id}")]
        //[ResponseType(typeof(user))]
        //public IHttpActionResult DeleteUser(int id)
        //{
        //    user user = db.users.Find(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    db.users.Remove(user);
        //    db.SaveChanges();

        //    return Ok(user);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.users.Count(e => e.user_id == id) > 0;
        }
    }
}
