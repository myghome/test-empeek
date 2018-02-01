using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Backend.Models;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices.ComTypes;
using System.Web.Http.Cors;

namespace Backend.Controllers
{
    [Route("api/Users")]
    public class UsersController : ApiController
    {

        private readonly IUserRepository _repository;
        public UsersController()
        {
            _repository = new UserRepository();
        }

        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return _repository.GetAllUsers();
        }
       
        [HttpGet]
        [Route("api/Users/id")]
        public async Task<IHttpActionResult> GetUserById([FromUri]long userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _repository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


        [HttpPost]
        public async Task<IHttpActionResult> PostUser([FromBody]string name)
        {
            User user;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                 user =  _repository.AddUser(name);
                 await _repository.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(HttpStatusCode.ServiceUnavailable);
            }
            return Ok(user.Id);
        }

        [HttpDelete]
        public async Task<IHttpActionResult> DeleteUser([FromUri]long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _repository.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            try
            {
                _repository.RemoveUser(user);
                await _repository.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(HttpStatusCode.ServiceUnavailable);
            }

            return Ok(user);
        }

    }
}