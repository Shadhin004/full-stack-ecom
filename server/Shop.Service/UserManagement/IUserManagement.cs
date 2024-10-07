using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shop.Core.User;

namespace Shop.Service.UserManagement
{
    public interface IUserManagement
    {
        public IEnumerable<UserInformation> GetAllUsers();
    }
}