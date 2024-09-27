using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlossomAvenue.Core.Orders;

namespace BlossomAvenue.Service.OrdersService
{
    public interface IOrderManagement
    {
        public Task<bool> CreateOrder(Guid userId);
        public Task<Order> GetOrder(Guid orderId);
        public Task<List<Order>> GetAllOrder(Guid userId);
        public Task<bool> UpdateOrder(Guid orderId, string orderStatus);
        public Task<List<Order>> GetAllOrderForAdmin();
        public Task<Order> UpdateOrderByAdmin(Guid orderId, string orderStatus);
    }
}