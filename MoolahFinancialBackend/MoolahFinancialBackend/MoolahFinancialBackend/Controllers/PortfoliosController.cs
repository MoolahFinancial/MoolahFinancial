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
    public class PortfoliosController : ApiController
    {
        private MoolahEntities db = new MoolahEntities();

        // GET: api/Portfolios
        [Route("api/Portfolios")]
        public IQueryable<portfolio> GetAllPortfolios()
        {
            return db.portfolios;
        }

        // GET: api/Portfolio/5
        /// <summary>  
        /// Returns a given portfolio based on the passed in id.
        /// </summary>  
        /// <param name="id"></param>  
        /// <returns></returns> 
        [ResponseType(typeof(portfolio))]
        public IHttpActionResult GetPortfolio(int id)
        {
            portfolio portfolio = db.portfolios.Find(id);
            if (portfolio == null)
            {
                return NotFound();
            }

            return Ok(portfolio);
        }

        /// <summary>  
        /// Returns the portfolio that is the best suited for a given user
        /// </summary>  
        /// <param name="userId"></param>  
        /// <returns></returns> 
        //[HttpGet]
        [Route("api/Portfolios/bestPortfolio/{userId:int:min(1)}")]
        [ResponseType(typeof(portfolio))]
        public IHttpActionResult GetBestDummyPortfolio(int userId)
        {
            var bestPortfolio = db.portfolios.FirstOrDefault(u => u.title.Contains("Ethical"));

            return Ok(new { success = true, message = "Found suggested portfolio", portfolio = bestPortfolio });
        }

        /// <summary>  
        /// Returns the portfolio that is the best suited for a given user
        /// </summary>  
        /// <param name="userId"></param>  
        /// <returns></returns> 
        [HttpGet]
        [Route("api/Portfolios/bestPortfolioInfo/{userId:int:min(1)}")]
        [ResponseType(typeof(portfolio))]
        public IHttpActionResult GetBestPortfolio(int userId)
        {
            // Use the stored procedure to retrieve the best portfolio's id & the number of common tags
            var result = db.get_best_portfolio_info(userId);

            return Ok(new { success = true, message = "Found suggested portfolio", result });
        }

        // PUT: api/Portfolio/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPortfolio(int id, portfolio portfolio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != portfolio.portfolio_id)
            {
                return BadRequest();
            }

            db.Entry(portfolio).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!portfolioExists(id))
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

        // POST: api/Portfolio
        [ResponseType(typeof(portfolio))]
        [Route("api/Portfolios/post")]
        public IHttpActionResult PostPortfolio(portfolio portfolio)
        {
            // Set the created_at DateTime variable to be the current time (YYYY-MM-DD HH:MM:SS)
            portfolio.created_at = DateTime.Now;
            // When the portfolio is created, the updated_at time should be the same as the created_at time
            portfolio.updated_at = DateTime.Now;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.portfolios.Add(portfolio);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { controller = "Portfolios", id = portfolio.portfolio_id }, portfolio);
        }

        // DELETE: api/Portfolio/5
        [ResponseType(typeof(portfolio))]
        public IHttpActionResult DeletePortfolio(int id)
        {
            portfolio portfolio = db.portfolios.Find(id);
            if (portfolio == null)
            {
                return NotFound();
            }

            db.portfolios.Remove(portfolio);
            db.SaveChanges();

            return Ok(portfolio);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool portfolioExists(int id)
        {
            return db.portfolios.Count(e => e.portfolio_id == id) > 0;
        }
    }
}
