using AngularApi.DTO;

namespace AngularApi.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int? SessionId { get; set; }
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }

        // Navigation properties
        public ShoppingSession? Session { get; set; }
        public Product? Products { get; set; }
       // public ProductWithRatingDTO2? Products { get; set; }
       public User? User { get; set; }
    }
}
