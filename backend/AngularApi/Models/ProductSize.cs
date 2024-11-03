namespace AngularApi.Models
{
    public class ProductSize
    {
        public int ProductSizeID { get; set; } 
        public int ProductID { get; set; } 

        public string? Size { get; set; } 

        public Product ?Product { get; set; } 
    }
}
