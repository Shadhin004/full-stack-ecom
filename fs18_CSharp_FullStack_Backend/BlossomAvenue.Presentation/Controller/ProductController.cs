using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlossomAvenue.Core.Products;
using BlossomAvenue.Service.ProductsServices;
using BlossomAvenue.Service.Repositories.Products;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlossomAvenue.Presentation.Controller
{
    [ApiController]
    [Route("api/v1/[controller]s")]
    public class ProductController : ControllerBase
    {
        private IProductManagement _productManagement;

        public ProductController(IProductManagement productManagement)
        {
            _productManagement = productManagement;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("")]
        public async Task<IActionResult> CreateProduct(CreateProductDto createProductDto)
        {
            var product = createProductDto.ConvertToProduct();
            var newProduct = await _productManagement.CreateProduct(product);
            Response.StatusCode = 201;
            return Created(nameof(CreateProduct), newProduct);
        }

        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> GetProductById([FromRoute] Guid id)
        {
            var product = await _productManagement.GetProductById(id);
            var readProduct = new GetProductByIdReadDto(product);
            return Ok(readProduct);
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch("{id:Guid}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] Guid id, [FromBody] UpdateProductDto updateProductDto)
        {

            var productToUpdate = updateProductDto.ConvertToProduct();
            await _productManagement.UpdateProduct(id, productToUpdate);
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> DeleteProductById([FromRoute] Guid id)
        {
            await _productManagement.DeleteProductById(id);
            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts([FromQuery] ProductQueryDto pqdto)
        {
            if (!string.IsNullOrEmpty(pqdto.OrderWith) && !(
                pqdto.OrderWith.ToLower() == "price" ||
                pqdto.OrderWith.ToLower() == "title" ||
                pqdto.OrderWith.ToLower() == "inventory"))
                throw new ArgumentException("Invalid orderWith parameter");

            if (!string.IsNullOrEmpty(pqdto.OrderWith) && !(pqdto.OrderBy.ToString().ToLower() == "asc" || pqdto.OrderBy.ToString().ToLower() == "desc"))
                throw new ArgumentException("Invalid orderBy parameter");

            if (pqdto.PageNo < 1) throw new ArgumentException("Invalid pageNo parameter");

            if (pqdto.PageSize < 1) throw new ArgumentException("Invalid pageSize parameter");

            var products = await _productManagement.GetAllProducts(pqdto);
            var readProducts = products.Items.Select(p => new GetAllProductReadDto(p)).ToList();

            var result = new PaginatedProductResultDto
            {
                TotalCount = products.TotalCount,
                Products = readProducts
            };
            return Ok(result);
        }







    }











}