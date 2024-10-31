using AngularApi.DTO;

namespace AngularApi.Models
{
    public class Wishlist
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int? ProductId { get; set; }
        public DateTime? CreatedAt { get; set; }

        public User? User { get; set; }
        public ProductWithRatingDTO2? Product { get; set; }
    }
}
