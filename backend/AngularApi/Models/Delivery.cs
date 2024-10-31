using System.Text.Json.Serialization;

namespace AngularApi.Models
{
    public class Delivery
    {
        public int DeliveryId { get; set; }
        public string?RecipientName { get; set; }
        public string? UserId { get; set; }
        public string? Email { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? PhoneNumber { get; set; }                    
        public decimal? DeliveryCost { get; set; }      
        public int? OrderId { get; set; }
        [JsonIgnore]
        public OrderDetails? Order { get; set; }
        public User? User { get; set; }
    }

}
