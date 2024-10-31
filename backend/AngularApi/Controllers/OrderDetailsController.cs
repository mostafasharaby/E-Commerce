using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApi.Models;
using System.Security.Claims;
using AngularApi.DTO;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace AngularApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class OrderDetailsController : ControllerBase
    {
        private readonly AngularDbContext _context;

        public OrderDetailsController(AngularDbContext context)
        {
            _context = context;
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<OrderDetails>>> GetOrderDetails()
        //{
        //    return await _context.OrderDetails.ToListAsync();
        //}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDetailsDTO>>> GetOrderDetails()
        {
            var orderDetails = await _context.OrderDetails
                .Include(od => od.PaymentDetails)  
                .Include(od => od.OrderItems)  
                .Join(_context.Users,
                      od => od.UserId,
                      u => u.Id,
                      (od, u) => new OrderDetailsDTO
                      {
                          Id = od.Id,
                          UserId = od.UserId,
                          UserName = u.UserName,  
                          Total = od.Total,
                          PaymentId = od.PaymentId,
                          CreatedAt = od.CreatedAt,
                          ModifiedAt = od.ModifiedAt
                      })
                .ToListAsync();

            return Ok(orderDetails);
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetails>> GetOrderDetails(int id)
        {
            var orderDetails = await _context.OrderDetails.FindAsync(id);

            if (orderDetails == null)
            {
                return NotFound();
            }

            return orderDetails;
        }

      
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderDetails(int id, OrderDetails orderDetails)
        {
            if (id != orderDetails.Id)
            {
                return BadRequest();
            }

            _context.Entry(orderDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderDetailsExists(id))
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

       
        /// <summary>
        // {
        //  "orderid":39,
        //  "total":2024,
        //  "paymentDetails":null,
        //  "orderItems": null
        // }
        /// </summary>
        /// <param name="orderDetails"></param>
        /// <returns></returns>

        //[HttpPost]
        //    public async Task<ActionResult<OrderDetails>> PostOrderDetails(OrderDetails orderDetails)
        //    {
        //        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Get logged-in user Id
        //        if (string.IsNullOrEmpty(userId))
        //        {
        //            return BadRequest("User is not authenticated.");
        //        }
        //        if (orderDetails.PaymentId == null)
        //        {
        //            var paymentDetails = new PaymentDetails
        //            {
        //                Amount = orderDetails.Total,
        //                Status = "Pending", // Initial status
        //                CreatedAt = DateTime.Now,
        //                OrderId = orderDetails.Id
        //            };

        //            _context.PaymentDetails.Add(paymentDetails);
        //            await _context.SaveChangesAsync();
        //            orderDetails.PaymentId = paymentDetails.Id;
        //        }

        //        orderDetails.CreatedAt = DateTime.Now;
        //        orderDetails.UserId = userId;

        //       // Console.WriteLine("Received Order Details:", orderDetails); 

        //        _context.OrderDetails.Add(orderDetails);
        //        await _context.SaveChangesAsync();

        //        return CreatedAtAction("GetOrderDetails", new { id = orderDetails.Id }, orderDetails);
        //    }

        //[HttpPost]
        //public async Task<IActionResult> CreateOrder([FromBody] OrderDetails orderDetails)
        //{
        //    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); 
        //    if (string.IsNullOrEmpty(userId))
        //    {
        //        return BadRequest("User is not authenticated.");
        //    }
        //    orderDetails.CreatedAt = DateTime.Now;
        //    orderDetails.UserId = userId;

        //    if (orderDetails == null)
        //    {
        //        return BadRequest("Order details are required");
        //    }         
        //    _context.OrderDetails.Add(orderDetails);
        //    await _context.SaveChangesAsync();  

        //    var paymentDetails = new PaymentDetails
        //    {
        //        Amount = orderDetails.Total,
        //        Status = "Pending",  
        //        CreatedAt = DateTime.Now,
        //        OrderId = orderDetails.Id  
        //    };


        //    _context.PaymentDetails.Add(paymentDetails);
        //    await _context.SaveChangesAsync();  

        //    orderDetails.PaymentId = paymentDetails.Id;
        //    orderDetails.CreatedAt = DateTime.Now;
        //    _context.OrderDetails.Update(orderDetails);
        //    await _context.SaveChangesAsync();  

        //    return Ok(orderDetails);
        //}

        //[HttpPost("PostDto")]
        //public async Task<ActionResult<OrderDetails>> CreateOrder(OrderDetailsDTO orderDto)
        //{
        //    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Get logged-in user Id
        //    Console.WriteLine("userid from order "+ userId);
        //    if (string.IsNullOrEmpty(userId))
        //    {
        //        return BadRequest("User is not authenticated.");
        //    }
        //    var order = new OrderDetails
        //    {
        //        UserId = userId ,
        //        Total = orderDto.Total
        //    };

        //    _context.OrderDetails.Add(order);
        //    await _context.SaveChangesAsync();

        //    return Ok(order);
        //}


       

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderDetails orderDetails)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User is not authenticated.");
            }
           
            orderDetails.CreatedAt = DateTime.Now;
            orderDetails.UserId = userId;

            _context.OrderDetails.Add(orderDetails);
            await _context.SaveChangesAsync();

            //var delivery = await _context.Delivery.FirstOrDefaultAsync(d => d.OrderId == orderDetails.Id);

            // if (delivery != null)
            // {
            //     delivery.OrderId = orderDetails.Id;
            //     await _context.SaveChangesAsync();
            // }

            var delivery = new Delivery
            {
                UserId = userId,
                OrderId = orderDetails.Id,
                RecipientName = orderDetails.Delivery?.RecipientName,
                Email = orderDetails.Delivery?.Email,
                Country = orderDetails.Delivery?.Country,
                City = orderDetails.Delivery?.City,
                PhoneNumber = orderDetails.Delivery?.PhoneNumber,
                DeliveryCost = 10m
            };

            _context.Delivery.Add(delivery);
            await _context.SaveChangesAsync();

           orderDetails.DeliveryId = delivery.DeliveryId;



            var cartItems = await _context.CartItems
                .Where(c => c.UserId == userId)
                .ToListAsync();

            if (cartItems == null || !cartItems.Any())
            {
                return BadRequest("No items found in the cart to create an order.");
            }                     

            foreach (var cartItem in cartItems)
            {
                var orderItem = new OrderItem
                {
                    ProductId = cartItem.ProductId,
                    Quantity = cartItem.Quantity,
                    OrderId = orderDetails.Id,  
                    CreatedAt = DateTime.Now
                };
                _context.OrderItems.Add(orderItem);  
            }

            await _context.SaveChangesAsync();  

            var paymentDetails = new PaymentDetails
            {
                Amount = orderDetails.Total,
                Status = "Success",
                CreatedAt = DateTime.Now,
                OrderId = orderDetails.Id
            };

            _context.PaymentDetails.Add(paymentDetails);
            await _context.SaveChangesAsync();

            
            orderDetails.PaymentId = paymentDetails.Id;
            _context.OrderDetails.Update(orderDetails);
            await _context.SaveChangesAsync();

            
         

            return Ok(orderDetails);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderDetails(int id)
        {
            var orderDetails = await _context.OrderDetails.FindAsync(id);
            if (orderDetails == null)
            {
                return NotFound();
            }

            _context.OrderDetails.Remove(orderDetails);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderDetailsExists(int id)
        {
            return _context.OrderDetails.Any(e => e.Id == id);
        }
    }
}
