namespace AngularApi.Models
{
    public class ShoppingSession
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal? Total { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }

      
        public User? User { get; set; }
        public ICollection<CartItem>? CartItems { get; set; }
    }
}
