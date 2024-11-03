namespace AngularApi.Models
{
    public class ProductImage
    {
        public int ProductImageID { get; set; } 
        public int ProductID { get; set; } 

        public string? ImageUrl { get; set; } 
  
        public Product? Product { get; set; } 
    }
}
