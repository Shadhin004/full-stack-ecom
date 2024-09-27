using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlossomAvenue.Core.Users;
using BlossomAvenue.Service.Repositories.Cities;

namespace BlossomAvenue.Service.CityService
{
    public class CityManagement : ICityManagement
    {
        private ICityRepository _cityRepository;

        public CityManagement (ICityRepository cityRepository)
        {
            _cityRepository = cityRepository;
        }
        public async Task<List<City>> GetAllCities()
        {
            return await _cityRepository.GetAllCities();
        }
    }
}