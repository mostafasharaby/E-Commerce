using System.Text.Json.Serialization;

namespace AngularApi.Models
{
    public class PaymentDetails
    {
        public int Id { get; set; }
        public int? OrderId { get; set; }
        public decimal? Amount { get; set; }
        public string? Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Navigation property
        [JsonIgnore]
        public OrderDetails? Order { get; set; }
    }
}
