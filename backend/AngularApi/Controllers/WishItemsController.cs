using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApi.DTO;
using AngularApi.Models;
using System.Security.Claims;

namespace AngularApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishItemsController : ControllerBase
    {
        private readonly AngularDbContext _context;

        public WishItemsController(AngularDbContext context)
        {
            _context = context;
        }
       

        [HttpGet("WishItems")]
        public async Task<ActionResult<IEnumerable<WishItems>>> GetWishListWithProducts()
        {
            var carts = await _context.WishItems
                .Select(cart => new WishItems
                {
                    Id = cart.Id,
                    ProductId = cart.ProductId,       
                    CreatedAt = cart.CreatedAt,                 
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


       
        [HttpGet("{id}")]
        public async Task<ActionResult<WishItems>> GetCart(int id)
        {
            var cart = await _context.WishItems
                .Where(c => c.Id == id)
                .Select(cart => new WishItems
                {
                    Id = cart.Id,
                    ProductId = cart.ProductId,                   
                    CreatedAt = cart.CreatedAt,                 
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
        public async Task<IActionResult> PutWishItems(int id, WishItems wishItems)
        {
            if (id != wishItems.Id)
            {
                return BadRequest();
            }

            _context.Entry(wishItems).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WishItemsExists(id))
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

      
        [HttpPost("WishItems")]
        public async Task<ActionResult<WishItems>> PostWishItems(WishItems wishItems)
        {

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User is not authenticated.");
            }

            
            wishItems.CreatedAt = DateTime.Now;
            wishItems.UserId = userId;

            _context.WishItems.Add(wishItems);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWishListWithProducts", new { id = wishItems.Id }, wishItems);
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishItems(int id)
        {
            var wishItems = await _context.WishItems.FindAsync(id);
            if (wishItems == null)
            {
                return NotFound();
            }

            _context.WishItems.Remove(wishItems);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WishItemsExists(int id)
        {
            return _context.WishItems.Any(e => e.Id == id);
        }
    }
}
