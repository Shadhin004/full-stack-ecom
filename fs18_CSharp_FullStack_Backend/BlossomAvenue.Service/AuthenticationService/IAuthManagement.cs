using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlossomAvenue.Service.AuthenticationService
{
    public interface IAuthManagement
    {
        Task<AuthenticationResultDto> Authenticate(AuthenticationDto authenticationDto);
        public void Logout(string token);
    }
}
