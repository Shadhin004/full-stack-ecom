using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shop.Core.User;

namespace Shop.Service.Repositories.Users
{
    public interface IUserRepository
    {
        public Task<List<UserInformation>> GetAllUsers();
    }
}