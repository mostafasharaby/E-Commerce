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
    public class CartItemsController : ControllerBase
    {
        private readonly AngularDbContext _context;

        public CartItemsController(AngularDbContext context)
        {
            _context = context;
        }

        // GET: api/CartItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
           // var userGmail = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User is not authenticated.");
            }
            return await _context.CartItems
                .Where(w=>w.UserId == userId)
                .Include(w=>w.Products)
                .ThenInclude(w=>w.Ratings)
                .ToListAsync();
        }

        [HttpGet("CartWithProducts")]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCartWithItems()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User is not authenticated.");
            }

            return await _context.CartItems
                .Where(w => w.UserId == userId)
                .Include(i=>i.Products)
                .ThenInclude(w => w.Ratings)
                .ToListAsync();
        }
        [HttpGet("GetByProduct/{description}")]
        public async Task<ActionResult<CartItem>> GetCartItemByProductId(string description)
        {
            var cartItem = await _context.CartItems
                .Include(i => i.Products)  
                .ThenInclude(p => p.Ratings)  
                .FirstOrDefaultAsync(ci => ci.Products.Description == description);

            if (cartItem == null)
            {
                return NotFound(); 
            }

            return cartItem; 
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<CartItem>> GetCartItem(int id)
        {
            var cartItem = await _context.CartItems
                .Include(i => i.Products)
                .ThenInclude(w => w.Ratings)
                .FirstOrDefaultAsync(i => i.Id == id); 

            if (cartItem == null)
            {
                return NotFound();
            }

            return cartItem;
        }

      
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCartItem(int id, CartItem cartItem)
        {
            if (id != cartItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(cartItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartItemExists(id))
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
        public async Task<ActionResult<CartItem>> PostCartItem(CartItem cartItem)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User is not authenticated.");
            }
            cartItem.CreatedAt = DateTime.Now;
            cartItem.UserId = userId;
            //cartItem.Products.TotalPrice = cartItem.Products.Price * cartItem.Products.Count;
            
            if (cartItem == null)
            {
                return BadRequest("Order details are required");
            }
            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCartItem", new { id = cartItem.Id }, cartItem);
        }

       
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int id)
        {
            var cartItem = await _context.CartItems.FindAsync(id);
            if (cartItem == null)
            {
                return NotFound();
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartItemExists(int id)
        {
            return _context.CartItems.Any(e => e.Id == id);
        }
    }
}
