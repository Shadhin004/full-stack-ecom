using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlossomAvenue.Service.CartsService
{
    public class CartCreateDto
    {
        public Guid UserId {get; set;}
        public Guid ProductId {get; set;}
        public Guid VariationId {get; set;}
        public int Quantity {get; set;}
    }
}