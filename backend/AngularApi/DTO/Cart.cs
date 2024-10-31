using AngularApi.Models;

namespace AngularApi.DTO
{
    public class Cart
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
   
        public ProductWithRatingDTO2? Product { get; set; }
    }
}
