
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using Shop.Core.User;
using Shop.Service.UserManagement;

namespace Shop.Controller.Controller
{
    [ApiController]
    [Route("api/v1/[controller]s")]
    public class UsersController : ControllerBase
    {
        private IUserManagement _userManagement;

        public UsersController(IUserManagement userManagement)
        {
            _userManagement = userManagement;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public IEnumerable<UserInformation> GetAllUsers()
        {
            return _userManagement.GetAllUsers();
        }
    }
}