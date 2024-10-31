//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using AngularApi.Models;
//using System.Security.Claims;

//namespace AngularApi.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class WishlistsController : ControllerBase
//    {
//        private readonly AngularDbContext _context;

//        public WishlistsController(AngularDbContext context)
//        {
//            _context = context;
//        }

//        // GET: api/Wishlists
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<Wishlist>>> GetWishlists()
//        {
//            return await _context.Wishlists.ToListAsync();
//        }

//        // GET: api/Wishlists/5
//        [HttpGet("{id}")]
//        public async Task<ActionResult<Wishlist>> GetWishlist(int id)
//        {
//            var wishlist = await _context.Wishlists.FindAsync(id);

//            if (wishlist == null)
//            {
//                return NotFound();
//            }

//            return wishlist;
//        }

//        // PUT: api/Wishlists/5
//        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
//        [HttpPut("{id}")]
//        public async Task<IActionResult> PutWishlist(int id, Wishlist wishlist)
//        {
//            if (id != wishlist.Id)
//            {
//                return BadRequest();
//            }

//            _context.Entry(wishlist).State = EntityState.Modified;

//            try
//            {
//                await _context.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                if (!WishlistExists(id))
//                {
//                    return NotFound();
//                }
//                else
//                {
//                    throw;
//                }
//            }

//            return NoContent();
//        }

//        // POST: api/Wishlists
//        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
//        [HttpPost]
//        public async Task<ActionResult<Wishlist>> PostWishlist(Wishlist wishlist)
//        {
//            // Get the authenticated user's ID
//            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//            if (string.IsNullOrEmpty(userId))
//            {
//                return BadRequest("User is not authenticated.");
//            }

//            // Set the creation time and user ID for the wishlist
//            wishlist.CreatedAt = DateTime.Now;
//            wishlist.UserId = userId;

//            if (wishlist == null || wishlist.ProductId == null)
//            {
//                return BadRequest("Wishlist or Product ID is required.");
//            }

//            // Check if the product exists in the database
//            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductID == wishlist.ProductId);
//            if (product == null)
//            {
//                return BadRequest("Product does not exist.");
//            }

//            // Set the ProductId on the wishlist
//            wishlist.ProductId = product.ProductID;

//            // Attach the product to avoid EF Core thinking it's a new product
//            _context.Entry(product).State = EntityState.Unchanged;

//            // Add the wishlist to the context and save changes
//            _context.Wishlists.Add(wishlist);
//            await _context.SaveChangesAsync();

//            return CreatedAtAction("GetWishlist", new { id = wishlist.Id }, wishlist);
//        }


//        // DELETE: api/Wishlists/5
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteWishlist(int id)
//        {
//            var wishlist = await _context.Wishlists.FindAsync(id);
//            if (wishlist == null)
//            {
//                return NotFound();
//            }

//            _context.Wishlists.Remove(wishlist);
//            await _context.SaveChangesAsync();

//            return NoContent();
//        }

//        private bool WishlistExists(int id)
//        {
//            return _context.Wishlists.Any(e => e.Id == id);
//        }
//    }
//}
