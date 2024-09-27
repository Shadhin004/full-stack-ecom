using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlossomAvenue.Service.ProductsServices
{
    public class PaginatedProductResultDto
{
    public int TotalCount { get; set; }
    public List<GetAllProductReadDto> Products { get; set; }
}
}