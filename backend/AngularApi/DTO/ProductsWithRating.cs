using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularApi.DTO
{
    public class ProductWithRatingDTO
    {
        public int id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int CategoryID { get; set; }
        public string? ImgUrl { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string ?Type { get; set; }
        public string? Stock { get; set; }
        public decimal? PrevPrice { get; set; }
        public decimal? Discount { get; set; }
        public decimal? TotalPrice { get; set; }

        public decimal? Rate { get; set; }
        public int? RatingCount { get; set; }
    }

    public class ProductWithRatingDTO2
    {
        [Key]
        public int ProductId { get; set; }
        public string Name { get; set; }
        
        public int count { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int CategoryID { get; set; }
        public string? ImgUrl { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Type { get; set; }
        public string? Stock { get; set; }
        public decimal? PrevPrice { get; set; }
        public decimal? Discount { get; set; }
        public decimal? TotalPrice { get; set; }
        [NotMapped]
        public RatingsDTO? Ratings { get; set; } // Add Ratings as a nested DTO
    }
   
    public class RatingsDTO
    {
        
        public decimal? Rate { get; set; }
        public int? Count { get; set; }
    }


}
