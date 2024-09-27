using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlossomAvenue.Core.Carts;
using BlossomAvenue.Service.CartsService;

namespace BlossomAvenue.Service.Repositories.Carts
{
    public interface ICartItemsRepository
    {
        public Task<bool> CreateCartItems(CartCreateDto cartCreateDto);
        public Task<bool> UpdateCart(Guid cartItemId, Guid productId, Guid variantId, int quantity);
        public Task<bool> DeleteProductFromCart(Guid cartItemId);
        public Task <CartItem> GetCartItem(Guid cartItemId);
    }
}