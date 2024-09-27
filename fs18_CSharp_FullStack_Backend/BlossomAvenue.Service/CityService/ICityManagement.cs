using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlossomAvenue.Core.Users;

namespace BlossomAvenue.Service.CityService
{
    public interface ICityManagement
    {
        public Task<List<City>> GetAllCities();
    }
}