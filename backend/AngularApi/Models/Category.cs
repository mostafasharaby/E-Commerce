namespace AngularApi.Models
{
    public class Category
    {
        public int CategoryID { get; set; }
        public string? Title { get; set; }
        public string? Path { get; set; }
        public List<Product>? Items { get; set; }
    }

}
