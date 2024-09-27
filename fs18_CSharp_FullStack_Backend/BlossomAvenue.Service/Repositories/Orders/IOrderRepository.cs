using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlossomAvenue.Core.Orders;

namespace BlossomAvenue.Service.Repositories.Orders
{
    public interface IOrderRepository
    {
        public Task<bool> CreateOrder(Guid userId);
        public Task <Order> GetOrder(Guid orderId);
        public Task <List<Order>> GetAllOrder(Guid userId);
        public Task<bool> UpdateOrder(Guid orderId, string orderStatus);
        public Task <List<Order>> GetAllOrderForAdmin();
        public Task <Order> UpdateOrderbyAdmin(Guid orderId, string orderStatus);

    }
}