using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlossomAvenue.Core.Carts;
using BlossomAvenue.Service.Repositories.Carts;
using BlossomAvenue.Infrastrcture.Database;
using Microsoft.EntityFrameworkCore;
using BlossomAvenue.Service.CartsService;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace BlossomAvenue.Infrastrcture.Repositories.Carts
{
    public class CartRepository : ICartRepository
    {
        private BlossomAvenueDbContext _context;

        public CartRepository(BlossomAvenueDbContext context)
        {
            _context = context;
        }
        public async Task<CartDto> GetCart(Guid userId)
        {
            var cart = await _context.Carts
                         .Include(c => c.CartItems)
                         .ThenInclude(ci => ci.Product)
                         .Include(c => c.CartItems)
                            .ThenInclude(ci => ci.Variation)
                         .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                return null;
            }
            var cartDto = new CartDto
            {
                Id = cart.CartId,
                CartItems = cart.CartItems.Select(ci => new CartItemDto
                {
                    CartId = ci.CartId,
                    Quantity = ci.Quantity,
                    Product = ci.Product,
                    Variation = ci.Variation,
                    CartItemsId = ci.CartItemsId
                }).ToList()
            };

            return cartDto;
        }

        public async Task<bool> CreateCart(Guid userId)
        {
            try
            {
                var newCart = new Cart
                {
                    CartId = Guid.NewGuid(),
                    UserId = userId,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Carts.Add(newCart);

                var result = await _context.SaveChangesAsync();
                return result > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}