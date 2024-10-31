using System.Text.Json.Serialization;

namespace AngularApi.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Count { get; set; }
        public int Quantity { get; set; }
        public int CategoryID { get; set; }
        public string? ImgUrl { get; set; }
        public string? Title { get; set; }
        public string ? Description { get; set; }
        public string? Type { get; set; }
        public string? Stock { get; set; }
        public decimal? PrevPrice { get; set; }
        public decimal? Discount { get; set; }
        public decimal? TotalPrice { get; set; }
  
        public Category? Category { get; set; }
       // [JsonIgnore]
        public Rating? Ratings { get; set; }
        public ICollection<ProductSize>? Sizes { get; set; }
        public ICollection<ProductImage>? Images { get; set; }
    }

}
