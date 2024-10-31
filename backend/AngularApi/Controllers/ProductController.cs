using AngularApi.DTO;
using AngularApi.Models;
using AngularApi.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace AngularApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository Repository;
        public ProductController(IProductRepository _productRepository)
        {
            Repository = _productRepository;
        }
      // ApiiiiContext Context = new ApiiiiContext();

        [HttpGet]
       // [Authorize(Roles = "admin")]
        public IActionResult GEtAllProducts()
        {
            var c = Repository.GetAll();
            return Ok(c);
        }
       


        [HttpGet("GetProductsWithRatings")]
        public async Task<ActionResult<IEnumerable<ProductWithRatingDTO>>> GetProductsWithRatings()
        {
            var c = Repository.GetProductsWithRatingsAsync();
            return Ok(c);
        }

        [HttpGet("GetProductsWithTitle")]
        public IActionResult GetProductsWithRatings(string title)
        {
            var products = Repository.GetProductsWithRatings(title);                             
            return Ok(products);
        }


        [HttpGet("GetProductsWithTitle222")]
        public IActionResult GetProductsWithRatings2(string title)
        {
            var products = Repository.GetProductsWithRatings2(title);
            return Ok(products);
        }




        [HttpGet]
        [Route("{id:int}", Name = "ProductDetailsRoute")]
        public IActionResult GEtProduct(int id)
        {
            var g = Repository.GetById(id);
            return Ok(g);
        }
        [HttpPost]
        public IActionResult AddProduct(Product product)
        {
            if (ModelState.IsValid)
            {
                Repository.Insert(product);
                var url = Url.Link("ProductDetailsRoute", new { id = product.ProductId });
                return Created(url, product);
            }
            return BadRequest(ModelState);
        }
        [HttpPut("{id}")]
        public IActionResult UpdateProduct([FromRoute] int id, [FromBody] Product product)
        {
            if (ModelState.IsValid)
            {
                Repository.Update(id, product);
                return StatusCode(statusCode: 204);
            }

            return BadRequest(ModelState);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            Repository.Delete(id);
            return StatusCode(statusCode: 204);
        }        

        [HttpPatch("{id}")]
        public IActionResult UpdateSomeAtrribute([FromRoute] int id, [FromBody] Product product)
        {
            if (ModelState.IsValid)
            {
                Repository.Update(id, product);
                return StatusCode(statusCode: 204);
            }

            return BadRequest(ModelState);
        }
    }
}
