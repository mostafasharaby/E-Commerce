using AngularApi.DTO;
using AngularApi.Models;

namespace AngularApi.Repository
{
    public interface IProductRepository
    {
        public List<Product> GetAll();
        public Product GetById(int id);


        public void Update(int id, Product product);
        public void Delete(int id);

        public void Insert(Product product);

        public IEnumerable<ProductWithRatingDTO> GetProductsWithRatingsAsync();

        public List<ProductWithRatingDTO> GetProductsWithRatings(string title);

        public List<ProductWithRatingDTO2> GetProductsWithRatings2(string title);
    }
}
