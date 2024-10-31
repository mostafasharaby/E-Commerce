using Microsoft.AspNetCore.Identity;

namespace AngularApi.Models
{
    public class User:IdentityUser
    {
        public string? AddressLine1 { get; set; }
        public string? City { get; set; }
        public ICollection<OrderDetails>?OrderDetails { get; set; }
    } 

    

}
