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
    /// The Tag Controller class.
    /// Contains all APIs for tags, user_tags, and portfolio_tags
    /// </summary>
    [RoutePrefix("api/tags")]
    public class TagsController : ApiController
    {
        private MoolahEntities db = new MoolahEntities();

        /// <summary>  
        /// Returns all of tags stored in the database
        /// </summary> 
        public IQueryable<tag> GetTags()
        {
            return db.tags;
        }

        /// <summary>  
        /// Returns all of the user tags in the database
        /// </summary> 
        public IQueryable<user_tag> GetUserTags()
        {
            return db.user_tag;
        }

        // GET: api/Tags/5
        [ResponseType(typeof(tag))]
        public IHttpActionResult GetTag(int id)
        {
            tag tag = db.tags.Find(id);
            if (tag == null)
            {
                return NotFound();
            }

            return Ok(tag);
        }

        // PUT: api/Tags/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttag(int id, tag tag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tag.tag_id)
            {
                return BadRequest();
            }

            db.Entry(tag).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tagExists(id))
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

        // POST: api/Tags
        [ResponseType(typeof(tag))]
        public IHttpActionResult Posttag(tag tag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tags.Add(tag);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tag.tag_id }, tag);
        }

        /// <summary>  
        /// Creates a new user tag
        /// </summary>
        /// <param name="user_tag"></param> 
        /// <returns></returns>
        [HttpPost]
        [Route("userTag", Name = "NewUserTag")]
        [ResponseType(typeof(user_tag))]
        public IHttpActionResult NewUserTag(user_tag user_tag)
        {
            // If the user tag already exists for a given question, return a conflict
            if (db.user_tag.Any(c => c.question_text.Contains(user_tag.question_text)))
            {
                return Conflict();
            }

            // Add the tag and save the changes in the database
            db.user_tag.Add(user_tag);
            db.SaveChanges();

            // Retrieve the newly created user tag from the database
            user_tag = db.user_tag.FirstOrDefault(c => c.question_text.Contains(user_tag.question_text));

            return Ok(new { success = true, message = "Successfully created a new user tag", user_tag });
        }

        // DELETE: api/Tags/5
        [ResponseType(typeof(tag))]
        public IHttpActionResult Deletetag(int id)
        {
            tag tag = db.tags.Find(id);
            if (tag == null)
            {
                return NotFound();
            }

            db.tags.Remove(tag);
            db.SaveChanges();

            return Ok(tag);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tagExists(int id)
        {
            return db.tags.Count(e => e.tag_id == id) > 0;
        }
    }
}