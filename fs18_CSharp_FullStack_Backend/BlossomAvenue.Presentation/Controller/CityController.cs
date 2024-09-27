using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlossomAvenue.Service.CityService;
using Microsoft.AspNetCore.Mvc;

namespace BlossomAvenue.Presentation.Controller
{
    [ApiController]
    [Route("api/[controller]s")]
    public class CityController : ControllerBase
    {
         private ICityManagement _cityManagement;
        public CityController(ICityManagement cityManagement)
        {
            _cityManagement = cityManagement;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCities()
        {
           var result = await _cityManagement.GetAllCities();
            return Ok(result);
        }
    }
}