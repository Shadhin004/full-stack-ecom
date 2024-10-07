using Shop.Core.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Service.AuthenticationService
{
    public interface IJwtManagement
    {
        string GenerateToken(UserInformation user);
        void InvalidateToken(string token);
        bool ValidateToken(string token);
    }
}
