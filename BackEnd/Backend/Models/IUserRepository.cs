using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Models
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAllUsers();

        User AddUser(string name);

        void AddPet(User user, string newPetname);

        void RemoveUser(User user);

        void RemovePet(long petId);

        Task<User> GetUserByIdAsync(long userId);

        Pet GetPetById(User user, long petId);

        Task<bool> SaveChangesAsync();
    }
}
