using System.Text.Json.Serialization;

namespace AngularApi.Models
{
    public class OrderDetails
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public decimal? Total { get; set; }
        public int? PaymentId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
        [JsonIgnore]        
        public PaymentDetails? PaymentDetails { get; set; }
        [JsonIgnore]
        public ICollection<OrderItem>? OrderItems { get; set; }
        
        public int? DeliveryId { get; set; }       
        public Delivery? Delivery { get; set; }
    }
}
