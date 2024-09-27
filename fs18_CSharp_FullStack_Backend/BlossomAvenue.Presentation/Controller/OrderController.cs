using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlossomAvenue.Service.CustomExceptions;
using BlossomAvenue.Service.OrdersService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace BlossomAvenue.Presentation.Controller
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class OrderController : ControllerBase
    {
        private IOrderManagement _orderManagement;
        public OrderController(IOrderManagement orderManagement)
        {
            _orderManagement = orderManagement;
        }

        [Authorize(Roles = "Admin, Customer")]
        [HttpPost()]
        public async Task<IActionResult> CreateOrder()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (currentUserId == null)
            {
                return Unauthorized();
            }
            try
            {
                var success = await _orderManagement.CreateOrder(Guid.Parse(currentUserId));

                if (success)
                {
                    return Ok(new { Message = "Order created successfully." });
                }
                else
                {
                    throw new Exception("Something went wrong!");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch]
        public async Task<IActionResult> UpdateOrder(Guid orderId, string orderStatus)
        {
            try
            {
                var success = await _orderManagement.UpdateOrder(orderId, orderStatus);

                if (success)
                {
                    return Ok(new { Message = "Order updated successfully." });
                }
                else
                {
                    throw new Exception("Something went wrong!");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin, Customer")]
        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetOrder(Guid orderId)
        {
            var order = await _orderManagement.GetOrder(orderId);
            if (order == null)
            {
                throw new RecordNotFoundException("order");
            }

            return Ok(order);
        }

        [Authorize(Roles = "Admin, Customer")]
        [HttpGet()]
        public async Task<IActionResult> GetAllOrder()
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (currentUserId == null)
            {
                return Unauthorized();
            }

            var orderList = await _orderManagement.GetAllOrder(Guid.Parse(currentUserId));
            return Ok(orderList);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("admin")]
        public async Task<IActionResult> GetAllOrderForAdmin()
        {
            var orderList = await _orderManagement.GetAllOrderForAdmin();
            return Ok(orderList);
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch("{orderId}/admin")]
        public async Task<IActionResult> UpdateOrderByAdmin([FromRoute] Guid orderId, [FromQuery]string orderStatus)
        {
            var order = await _orderManagement.UpdateOrderByAdmin(orderId, orderStatus);
            return Ok(order);
        }

    }
}