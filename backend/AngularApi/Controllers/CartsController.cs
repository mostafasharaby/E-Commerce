using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApi.DTO;
using AngularApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace AngularApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CartsController : ControllerBase
    {
        private readonly AngularDbContext _context;

        public CartsController(AngularDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCart()
        {
            return await _context.Cart.ToListAsync();
        }

        [HttpGet("cartWithProducts")]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCartWithProducts()
        {
            var carts = await _context.Cart
                .Select(cart => new Cart
                {
                    Id = cart.Id,
                    ProductId = cart.ProductId,
                    Quantity = cart.Quantity,
                    CreatedAt = cart.CreatedAt,
                    ModifiedAt = cart.ModifiedAt,
                    Product = _context.Products
                        .Where(p => p.ProductId == cart.ProductId)
                        .Select(product => new ProductWithRatingDTO2
                        {
                            ProductId = product.ProductId,
                            Name = product.Name,
                            count = product.Count,
                            Price = product.Price,
                            Quantity = product.Quantity,
                            CategoryID = product.CategoryID,
                            ImgUrl = product.ImgUrl,
                            Title = product.Title,
                            Description = product.Description,
                            Type = product.Type,
                            Stock = product.Stock,
                            PrevPrice = product.PrevPrice,
                            Discount = product.Discount,
                            TotalPrice = product.TotalPrice,
                            Ratings = new RatingsDTO
                            {
                                Rate = product.Ratings.Rate,
                                Count = product.Ratings.Count
                            }
                        }).FirstOrDefault()
                })
                .ToListAsync();

            return Ok(carts);
        }
        [HttpGet("GetByProduct/{ProductId}")]
        public async Task<ActionResult<Cart>> GetCartByProductId(int ProductId)
        {
            var cartItem = await _context.Cart.FirstOrDefaultAsync(c => c.ProductId == ProductId);

            if (cartItem == null)
            {
                return NotFound();
            }

            return cartItem;
        }


        
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            var cart = await _context.Cart
                .Where(c => c.Id == id)
                .Select(cart => new Cart
                {
                    Id = cart.Id,
                    ProductId = cart.ProductId,
                    Quantity = cart.Quantity,
                    CreatedAt = cart.CreatedAt,
                    ModifiedAt = cart.ModifiedAt,
                    Product = _context.Products
                        .Where(p => p.ProductId == cart.ProductId)
                        .Select(product => new ProductWithRatingDTO2
                        {
                            ProductId = product.ProductId,
                            Name = product.Name,
                            count = product.Count,
                            Price = product.Price,
                            Quantity = product.Quantity,
                            CategoryID = product.CategoryID,
                            ImgUrl = product.ImgUrl,
                            Title = product.Title,
                            Description = product.Description,
                            Type = product.Type,
                            Stock = product.Stock,
                            PrevPrice = product.PrevPrice,
                            Discount = product.Discount,
                            TotalPrice = product.TotalPrice,
                            Ratings = new RatingsDTO
                            {
                                Rate = product.Ratings.Rate,
                                Count = product.Ratings.Count
                            }
                        }).FirstOrDefault()
                })
                .FirstOrDefaultAsync();

            if (cart == null)
            {
                return NotFound();
            }

            return Ok(cart);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            if (id != cart.Id)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            // Check if the cart with the same ProductId already exists
            var existingCart = await _context.Cart
                .FirstOrDefaultAsync(c => c.ProductId == cart.ProductId);

            if (existingCart != null)
            {
                return Conflict(new { message = "Cart item with this ProductId already exists." });
            }

            _context.Cart.Add(cart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCart", new { id = cart.Id }, cart);
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _context.Cart.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Cart.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartExists(int id)
        {
            return _context.Cart.Any(e => e.Id == id);
        }
    }
}
