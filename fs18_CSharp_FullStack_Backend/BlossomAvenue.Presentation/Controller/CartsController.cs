using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlossomAvenue.Core.Carts;
using BlossomAvenue.Service.CartsService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using BlossomAvenue.Service.CustomExceptions;

namespace BlossomAvenue.Presentation.Controller
{
    [Authorize(Roles = "Admin, Customer")]
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CartsController : ControllerBase
    {
        private ICartManagement _cartManagement;

        public CartsController(ICartManagement cartManagement)
        {
            _cartManagement = cartManagement;
        }

        [Authorize(Roles = "Admin, Customer")]
        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (currentUserId == null)
            {
                return Unauthorized();
            }

            var result = await _cartManagement.GetCart(Guid.Parse(currentUserId)) ?? throw new RecordNotFoundException("cart");
            return Ok(result);
        }
    }
}