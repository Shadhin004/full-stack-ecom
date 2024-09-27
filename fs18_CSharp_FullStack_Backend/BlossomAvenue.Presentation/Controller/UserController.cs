using BlossomAvenue.Service.UsersService;
using BlossomAvenue.Service.UsersService.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;

namespace BlossomAvenue.Presentation.Controller
{
    [ApiController]
    [Route("api/v1/[controller]s")]
    public class UserController : ControllerBase
    {
        private readonly IUserManagement _userManagement;

        public UserController(IUserManagement userManagement)
        {
            _userManagement = userManagement;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetUsers(
            [FromQuery] UsersQueryDto query)
        {

            if (query.PageNo == 0) throw new ArgumentException("Invalid pageNo parameter");

            if (query.PageSize == 0) throw new ArgumentException("Invalid pageSize parameter");

            var users = await _userManagement.GetUsers(query);

            return Ok(users);
        }

        [Authorize(Roles = "Admin, Customer")]
        [HttpGet("profile")]
        public async Task<IActionResult> GetUser()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (currentUserId == null)
            {
                return Unauthorized();
            }
            var user = await _userManagement.GetUser(Guid.Parse(currentUserId));
            return Ok(user);
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch("profileStatus")]
        public async Task<IActionResult> ActiveInactiveUser([FromQuery] Guid userId, [FromQuery] bool status)
        {
            await _userManagement.ActiveInactiveUser(userId, status);
            return NoContent();
        }

        [Authorize(Roles = "Admin, Customer")]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUpdateUserDto user)
        {
            //Validate user model
            if (!ModelState.IsValid) throw new ArgumentException(String.Join(" | ", ModelState.Values.SelectMany(e => e.Errors)));

            var createdUser = await _userManagement.CreateUser(user);
            return Created(nameof(GetUser), createdUser);
        }

        [HttpPost("profile")]
        public async Task<IActionResult> CreateProfile(CreateDetailedUserDto profile)
        {
            var createdProfile = await _userManagement.CreateProfile(profile);
            createdProfile.Password = String.Empty;
            return Created(nameof(GetUser), createdProfile);
        }

        [Authorize(Roles = "Admin, Customer")]
        [HttpPatch("{userId}")]
        public async Task<IActionResult> UpdateUser([FromRoute] Guid userId, [FromQuery] CreateUpdateUserDto user)
        {
            await _userManagement.UpdateUser(userId, user);
            return NoContent();
        }
    }
}
