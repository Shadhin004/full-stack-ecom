using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlossomAvenue.Core.Carts;
using BlossomAvenue.Service.CartsService;
using BlossomAvenue.Service.CustomExceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


namespace BlossomAvenue.Presentation.Controller
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CartItemsController : ControllerBase
    {
        private ICartItemsManagement _cartItemsManagement;

        public CartItemsController(ICartItemsManagement cartItemsManagement)
        {
            _cartItemsManagement = cartItemsManagement;
        }

        [Authorize(Roles = "Customer")]
        [HttpPost()]
        public async Task<bool> CreateCartItems(CartCreateDto cartItemsDto)
        {
            // var cartItem = cartItemsDto.ConvertToCartitems();
            return await _cartItemsManagement.CreateCartItems(cartItemsDto);

        }

        [Authorize(Roles = "Customer")]
        [HttpGet("{cartItemId}")]
        public async Task<IActionResult> GetCartItem(Guid cartItemId)
        {
            var item = await _cartItemsManagement.GetCartItem(cartItemId);
            return Ok(item);
        }

        [Authorize(Roles = "Customer")]
        [HttpPatch()]
        public async Task<IActionResult> UpdateCart([FromQuery] Guid cartItemId, [FromQuery] Guid productId, [FromQuery] Guid variantId, [FromQuery] int quantity)
        {
            if (quantity <= 0) throw new ArgumentException("Quantity can not be less than or equal 0");

            var result = await _cartItemsManagement.UpdateCart(cartItemId, productId, variantId, quantity);

            if (result)
            {
                return NoContent();
            }
            else
            {
                throw new RecordNotFoundException("cartItems");
            }

        }

        [Authorize(Roles = "Admin, Customer")]
        [HttpDelete("{cartItemId}")]
        public async Task<IActionResult> DeleteProductFromCart(Guid cartItemId)
        {
            var result = await _cartItemsManagement.DeleteProductFromCart(cartItemId);
            if (result)
            {
                return Ok(new { Message = "Product removed from cart successfully." });
            }
            else
            {
                return NotFound(new { Message = "Product not found in cart." });
            }
        }
    }
}