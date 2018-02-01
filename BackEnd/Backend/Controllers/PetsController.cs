using Backend.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Backend.Controllers
{
    [Route("api/Pets")]
   
    public class PetsController : ApiController
    {
        private readonly IUserRepository _repository;
        public PetsController()
        {
            _repository = new UserRepository();
        }

        [HttpPost]
        public async Task<IHttpActionResult> PostPet( [FromBody]PetViewModel data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = data.UserId;
            var petName = data.Name;

            var user = await _repository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }
            try
            {
                _repository.AddPet(user, petName);
                await _repository.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(HttpStatusCode.ServiceUnavailable); 
            }

            return StatusCode(HttpStatusCode.OK);
        }
        [HttpDelete]
        public async Task<IHttpActionResult> DeletePet([FromBody]long petId)
        {
            try
            {
                _repository.RemovePet(petId);
                if (!await _repository.SaveChangesAsync())
                {
                    return NotFound();
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(HttpStatusCode.ServiceUnavailable);
            }

            return Ok();
        }
    }
}