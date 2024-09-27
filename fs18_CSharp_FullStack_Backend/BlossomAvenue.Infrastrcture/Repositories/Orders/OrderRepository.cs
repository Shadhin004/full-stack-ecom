using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlossomAvenue.Core.Orders;
using BlossomAvenue.Infrastrcture.Database;
using BlossomAvenue.Service.CustomExceptions;
using BlossomAvenue.Service.Repositories.Orders;
using Microsoft.EntityFrameworkCore;

namespace BlossomAvenue.Infrastrcture.Repositories.Orders
{
    public class OrderRepository : IOrderRepository
    {
        private BlossomAvenueDbContext _context;

        public OrderRepository(BlossomAvenueDbContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateOrder(Guid userId)
        {
            var cart = await _context.Carts
                                     .Include(c => c.CartItems)
                                     .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null || !cart.CartItems.Any())
            {
                throw new InvalidOperationException("Cart is empty or does not exist.");
            }

            var order = new Order
            {
                OrderId = Guid.NewGuid(),
                UserId = userId,
                AddressId = null,
                CreatedAt = DateTime.UtcNow,
                OrderStatus = "pending"
            };

            decimal? totalAmount = 0;

            foreach (var cartItem in cart.CartItems)
            {
                var variation = await _context.Variations
                                              .FirstOrDefaultAsync(v => v.VariationId == cartItem.Variationid);

                if (variation == null)
                {
                    throw new InvalidOperationException("Invalid variation for a cart item.");
                }

                // Check if there is enough inventory for the product
                if (variation.Inventory < cartItem.Quantity)
                {
                    throw new InvalidOperationException($"Not enough inventory for the product variation (ID: {variation.VariationId}).");
                }

                // Update the inventory by subtracting the quantity purchased
                variation.Inventory -= cartItem.Quantity;

                decimal itemPrice = variation.Price;
                decimal? totalPrice = itemPrice * cartItem.Quantity;

                totalAmount += totalPrice;

                var orderItem = new OrderItem
                {
                    OrderItemsId = Guid.NewGuid(),
                    OrderId = order.OrderId,
                    ProductId = cartItem.ProductId,
                    VariationId = cartItem.Variationid,
                    Quantity = cartItem.Quantity,
                    Price = totalPrice
                };

                order.OrderItems.Add(orderItem);
            }

            order.TotalAmount = totalAmount;
            _context.Orders.Add(order);

            _context.CartItems.RemoveRange(cart.CartItems);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Order> GetOrder(Guid orderId)
        {
            return await _context.Orders
                                     .Include(o => o.OrderItems)
                                     .FirstOrDefaultAsync(o => o.OrderId == orderId);
        }

        public async Task<List<Order>> GetAllOrder(Guid userId)
        {
            return await _context.Orders
                                     //  .Include(o => o.OrderItems)
                                     .Where(o => o.UserId == userId)
                                     .ToListAsync();
        }

        public async Task<bool> UpdateOrder(Guid orderId, string orderStatus)
        {
            var order = await _context.Orders
                                     .FindAsync(orderId);

            if (order == null)
            {
                throw new RecordNotFoundException("order");
            }

            order.OrderStatus = orderStatus;

            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Order>> GetAllOrderForAdmin()
        {
            return await _context.Orders.ToListAsync();
        }

        public async Task<Order> UpdateOrderbyAdmin(Guid orderId, string orderStatus)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null)
            {
                throw new KeyNotFoundException("Order not found.");
            }
            order.OrderStatus = orderStatus;
            await _context.SaveChangesAsync();

            return order;
        }
    }
}