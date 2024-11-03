using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApi.Models;
using AngularApi.DTO;
using System.Security.Claims;

namespace AngularApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishListProductsController : ControllerBase
    {
        private readonly AngularDbContext _context;

        public WishListProductsController(AngularDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishListProducts>>> GetWishListProducts()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User is not authenticated.");
            }
            return await _context.WishListProducts
                .Where(w => w.UserId == userId )
                .Include(w => w.Product)
                .ThenInclude(p => p.Ratings)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WishListProducts>> GetWishListProducts(int id)
        {

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User is not authenticated.");
            }

            Console.WriteLine("userId ", userId);
            var wishListProduct = await _context.WishListProducts
                                                .Where(w => w.UserId == userId && w.Id == id )
                                                .Include(w => w.Product) 
                                                .ThenInclude(p => p.Ratings)
                                                .FirstOrDefaultAsync(w => w.Id == id); 

            if (wishListProduct == null)
            {
                return NotFound();
            }

            return wishListProduct;
        }


       
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWishListProducts(int id, WishListProducts wishListProducts)
        {
            if (id != wishListProducts.Id)
            {
                return BadRequest();
            }

            _context.Entry(wishListProducts).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WishListProductsExists(id))
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
        public async Task<ActionResult<WishListProducts>> PostWishListProducts(WishListProducts wishListProducts)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
              
                    wishListProducts.UserId = null;  
                    wishListProducts.CreatedAt = DateTime.Now;                               
                    _context.WishListProducts.Add(wishListProducts);
                    await _context.SaveChangesAsync();
                    return CreatedAtAction("GetWishListProducts", new { id = wishListProducts.Id }, wishListProducts);
                
            }

            wishListProducts.CreatedAt = DateTime.Now;
            wishListProducts.UserId = userId;

            _context.WishListProducts.Add(wishListProducts);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWishListProducts", new { id = wishListProducts.Id }, wishListProducts);
        }

       
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishListProducts(int id)
        {
            var wishListProducts = await _context.WishListProducts.FindAsync(id);
            if (wishListProducts == null)
            {
                return NotFound();
            }

            _context.WishListProducts.Remove(wishListProducts);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WishListProductsExists(int id)
        {
            return _context.WishListProducts.Any(e => e.Id == id);
        }
    }
}
