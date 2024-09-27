using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlossomAvenue.Service.ProductsServices
{
    public class PaginatedResultDto<T>
{
    public int TotalCount { get; set; }
    public ICollection<T> Items { get; set; }
}
}