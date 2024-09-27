using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlossomAvenue.Core.Carts;
using BlossomAvenue.Infrastrcture.Database;
using BlossomAvenue.Service.CartsService;
using BlossomAvenue.Service.CustomExceptions;
using BlossomAvenue.Service.Repositories.Carts;
using Microsoft.EntityFrameworkCore;

namespace BlossomAvenue.Infrastrcture.Repositories.Carts
{
    public class CartItemsRepository : ICartItemsRepository
    {

        private BlossomAvenueDbContext _context;

        public CartItemsRepository(BlossomAvenueDbContext context)
        {
            _context = context;
        }

        public async Task<bool> DeleteProductFromCart(Guid cartItemId)
        {
            var cartItem = await _context.CartItems.FindAsync(cartItemId);

            if (cartItem == null)
            {
                return false;
            }

            _context.CartItems.Remove(cartItem);

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CreateCartItems(CartCreateDto cartCreateDto)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == cartCreateDto.UserId);

            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = cartCreateDto.UserId,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Carts.Add(cart);
                await _context.SaveChangesAsync(); // Save changes to get the cartId
            }

            var newItem = new CartItem
            {
                CartId = cart.CartId,
                ProductId = cartCreateDto.ProductId,
                Variationid = cartCreateDto.VariationId,
                Quantity = cartCreateDto.Quantity
            };

            _context.CartItems.Add(newItem);

            // Save changes to the database and return the result
            return await _context.SaveChangesAsync() > 0;
        }


        public async Task<bool> UpdateCart(Guid cartItemId, Guid productId, Guid variantId, int quantity)
        {
            var cartItem = await _context.CartItems.FindAsync(cartItemId);

            if (cartItem == null)
            {
                throw new RecordNotFoundException("cartItem");
            }

            cartItem.ProductId = productId;
            cartItem.Variationid = variantId;
            cartItem.Quantity = quantity;

            _context.CartItems.Update(cartItem);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<CartItem> GetCartItem(Guid cartItemId)
        {
            return await _context.CartItems.FindAsync(cartItemId);
        }
    }
}