namespace AngularApi.Models
{
    public class ProductImage
    {
        public int ProductImageID { get; set; } 
        public int ProductID { get; set; } // Foreign Key

        public string? ImageUrl { get; set; } // Image URL
  
        public Product? Product { get; set; } // Reference to the Product
    }
}
