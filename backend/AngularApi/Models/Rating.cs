using System.Text.Json.Serialization;

namespace AngularApi.Models
{
    public class Rating
    {
        public int RatingID { get; set; }  // Primary Key
        public decimal Rate { get; set; }  // Rating value, e.g., 4.5
        public int? Count { get; set; }     // Number of people who rated

         public int  ProductID { get; set; }
        [JsonIgnore]
        public Product? Product { get; set; } // Navigation property

    }
}
