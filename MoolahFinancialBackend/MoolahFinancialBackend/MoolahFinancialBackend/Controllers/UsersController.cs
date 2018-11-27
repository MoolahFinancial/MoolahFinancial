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
    public class UsersController : ApiController
    {
        private MoolahEntities db = new MoolahEntities();

        /*
         * Method: GetAllUsers()
         * Description: Retrieves all the users in the database (both deleted and non-deleted users)
         * HTTP Method: Get
         * Example call: api/Users
         */
        
        [Route("api/Users")]
        public IQueryable<user> GetAllUsers()
        {
            return db.users;
        }

        // GET: api/Users/5
        /// <summary>  
        /// Returns a given user based on the passed in id.
        /// </summary>  
        /// <param name="id"></param>  
        /// <returns></returns> 
        [ResponseType(typeof(user))]
        [Route("api/Users/{id}")]
        public IHttpActionResult GetUser(int id)
        {
            user user = db.users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT
        [ResponseType(typeof(void))]
        [Route("api/Users/edit/{id}")]
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
                if (!userExists(id))
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

        // POST
        [Route("api/Users/post")]
        [ResponseType(typeof(user))]
        public IHttpActionResult PostUser(user user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.users.Add(user);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (userExists(user.user_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = user.user_id }, user);
        }

        // DELETE
        [Route("api/Users/delete/{id}")]
        [ResponseType(typeof(user))]
        public IHttpActionResult DeleteUser(int id)
        {
            user user = db.users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool userExists(int id)
        {
            return db.users.Count(e => e.user_id == id) > 0;
        }
    }
}
