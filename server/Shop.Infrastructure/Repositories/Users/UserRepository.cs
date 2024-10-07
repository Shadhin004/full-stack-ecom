using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shop.Infrastrcture.Database;
using Microsoft.EntityFrameworkCore;
using Shop.Core.User;
using Shop.Service.Repositories.Users;

namespace Shop.Infrastructure.Repositories.Users
{
    public class UserRepository : IUserRepository
    {
        private readonly ShopDbContext _context;
        public UserRepository(ShopDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserInformation>> GetAllUsers()
        {
            // var users = await _context.UserInformation.ToListAsync();
            var users = await _context.UserInformations.ToListAsync();
            return users;
        }
    }
}