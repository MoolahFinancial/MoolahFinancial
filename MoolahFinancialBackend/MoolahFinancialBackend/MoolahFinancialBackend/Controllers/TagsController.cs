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
        [HttpGet]
        [Route("")]
        public IQueryable<tag> GetTags()
        {
            return db.tags;
        }

        /// <summary>  
        /// Returns all of the user tags in the database
        /// </summary> 
        [HttpGet]
        [Route("usertags")]
        public IQueryable<user_tag> GetUserTags()
        {
            return db.user_tag;
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
            // The user_id, the tag_id, and the question_text all have to be the same for there to be a conflict
            // since all 3 are primary keys
            if (db.user_tag.Any(c => c.question_text.Contains(user_tag.question_text) &&
                c.tag_id == user_tag.tag_id &&
                c.user_id == user_tag.user_id))
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

        /// <summary>  
        /// Deletes an exising user_tag (based on the question text and the user id
        /// </summary>
        /// <param name="user_id"></param> 
        /// <param name="question_text"></param> 
        /// <returns></returns>
        [HttpDelete]
        [Route("deleteUserTag", Name = "DeleteUserTag")]
        [ResponseType(typeof(bool))]
        public IHttpActionResult DeleteUserTag(int user_id, string question_text)
        {
            // Try to retrieve the matching user_tag
            user_tag userTag = db.user_tag.FirstOrDefault(c => string.Compare(c.question_text, question_text, true) == 0 &&
                                                          c.user_id == user_id);

            // If we find no matching user tag, simpily return
            if(userTag == null)
            {
                return Ok(new { success = false, message = "No matching user_tag found for deletion" });
            }

            // Delete the user_tag and save our changes
            db.user_tag.Remove(userTag);
            db.SaveChanges();

            return Ok(new { success = true, message = "Deleted user_tag", user_tag = userTag });
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