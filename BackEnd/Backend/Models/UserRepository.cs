using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Backend.Models
{
    public class UserRepository : IUserRepository
    {
        private UserContext _context;
        public UserRepository()
        {
            _context = new UserContext();
        }
        public void  AddPet(User user, string newPetname) => user.Pets.Add(new Pet() { Name = newPetname });

        public User AddUser(string name)
        {
            var user = new User() {Name = name};
            _context.Users.Add(user);
            return user;
        }

        public IEnumerable<User> GetAllUsers() =>  _context.Users;

        public void RemovePet(long petId)
        {
            var remotePet = new Pet() {Id = petId};
            _context.Pets.Attach(remotePet);
            _context.Pets.Remove(remotePet);
        }


        public void RemoveUser(User user) =>   _context.Users.Remove(user);
        

        public async Task<bool> SaveChangesAsync() =>  (await _context.SaveChangesAsync()) > 0;


        public async Task<User> GetUserByIdAsync(long userId) => await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

        public Pet GetPetById(User user, long petId) => user.Pets.FirstOrDefault(p => p.Id == petId);
           
    

    }
}