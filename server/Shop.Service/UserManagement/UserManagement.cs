using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shop.Core.User;

namespace Shop.Service.UserManagement
{
    public class UserManagement : IUserManagement
    {
        public IEnumerable<UserInformation> GetAllUsers()
        {
            throw new NotImplementedException();
        }
    }
}