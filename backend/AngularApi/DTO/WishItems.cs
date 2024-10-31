using AngularApi.Models;

namespace AngularApi.DTO
{
    public class WishItems
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int? ProductId { get; set; }
        public DateTime? CreatedAt { get; set; }

        public User? User { get; set; }
        // Navigation properties        
        public ProductWithRatingDTO2? Product { get; set; }
    }
}
