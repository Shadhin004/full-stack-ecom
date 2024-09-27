using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlossomAvenue.Core.Carts;
using BlossomAvenue.Core.Products;

namespace BlossomAvenue.Service.CartsService
{
    public class CreateCartItemsDto
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
        public Guid VariationId { get; set; }
        public int Quantity { get; set; }

        public CartItem ConvertToCartitems()
        {
            return new CartItem { CartItemsId = Guid.NewGuid(), CartId = this.UserId, ProductId = this.ProductId, Quantity = this.Quantity, Variationid = this.VariationId };
        }

    }

    public class CartItemDto
    {
        public Guid CartId { get; set; }
        public Guid CartItemsId {get; set;}
        public int Quantity { get; set; }
        public Product Product {get; set;}
        public Variation Variation {get; set;}
    }

}