using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlossomAvenue.Core.Orders;
using BlossomAvenue.Service.Repositories.Orders;

namespace BlossomAvenue.Service.OrdersService
{
    public class OrderManagement : IOrderManagement
    {
        private IOrderRepository _orderRepository;

        public OrderManagement (IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public async Task<bool> CreateOrder(Guid userId)
        {
            return await _orderRepository.CreateOrder(userId);
        }

        public async Task<Order> GetOrder(Guid orderId)
        {
            return await _orderRepository.GetOrder(orderId);
        }

        public async Task<List<Order>> GetAllOrder(Guid userId)
        {
            return await _orderRepository.GetAllOrder(userId);
        }

        public async Task<bool> UpdateOrder(Guid orderId, string orderStatus)
        {
            return await _orderRepository.UpdateOrder(orderId, orderStatus);
        }

        public async Task<List<Order>> GetAllOrderForAdmin()
        {
            return await _orderRepository.GetAllOrderForAdmin();
        }

        public async Task<Order> UpdateOrderByAdmin(Guid orderId, string orderStatus)
        {
            return await _orderRepository.UpdateOrderbyAdmin(orderId, orderStatus);
        }
    }
}