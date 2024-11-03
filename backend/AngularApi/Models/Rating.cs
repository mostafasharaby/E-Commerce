using System.Text.Json.Serialization;

namespace AngularApi.Models
{
    public class Rating
    {
        public int RatingID { get; set; } 
        public decimal Rate { get; set; }  
        public int? Count { get; set; }     

         public int  ProductID { get; set; }
        [JsonIgnore]
        public Product? Product { get; set; }

    }
}
