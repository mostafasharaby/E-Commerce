namespace AngularApi.Models
{
    public class WishListProducts
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int? ProductId { get; set; }
        public DateTime? CreatedAt { get; set; }

        // Navigation properties
        public User? User { get; set; }
        public Product? Product { get; set; }
    }


}
