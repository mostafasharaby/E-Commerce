namespace AngularApi.Models
{
    public class ProductSize
    {
        public int ProductSizeID { get; set; } // Primary Key
        public int ProductID { get; set; } // Foreign Key

        public string? Size { get; set; } // Size of the Product

        public Product ?Product { get; set; } // Reference to the Product
    }
}
