using AngularApi.DTO;
using AngularApi.Models;
using AngularApi.Repository;
using Microsoft.EntityFrameworkCore;

namespace angularapi.repository
{
    public class Productrepository :IProductRepository
    {
        private readonly AngularDbContext context;
        public Productrepository(AngularDbContext _context)
        {
            context = _context;
        }
        public void Delete(int id)
        {
            var del = context.Products.FirstOrDefault(p => p.ProductId == id);
            Console.WriteLine("del ", del);
            if (del != null)
            {
                context.Products.Remove(del);
                context.SaveChanges();
            }
        }

       

        public List<Product> GetAll()
        {
            var getall = context.Products.ToList();
            return getall;
        }

     
        public Product GetById(int id)
        {
            var get = context.Products.Include(p=>p.Ratings).FirstOrDefault(p => p.ProductId == id);           
             return get;                       
            
        }

 

        public void Insert(Product Product)
        {
            context.Products.Add(Product);
            context.SaveChanges();
        }


        public void Update(int id, Product Product)
        {
            var update = context.Products.FirstOrDefault(p => p.ProductId == id);
            if (update != null)
            {
                update.ProductId = Product.ProductId;
                update.Price = Product.Price;
                update.Name = Product.Name;
                update.Description = Product.Description;
                update.Category = Product.Category;
                update.CategoryID = Product.CategoryID;
                update.Title = Product.Title;
                update.PrevPrice = Product.PrevPrice;
                update.Images = Product.Images;
                update.Quantity = Product.Quantity;
                update.Discount = Product.Discount;
                update.Ratings  = Product.Ratings;
                update.TotalPrice = Product.TotalPrice;
                update.Count = Product.Count;
                update.ImgUrl = Product.ImgUrl;
                
                //  context.Products.update(update);
                context.SaveChanges();
            }
        }
        public  IEnumerable<ProductWithRatingDTO> GetProductsWithRatingsAsync()
        {
            return  context.Products
                .Include(p => p.Ratings) // Eager loading of Ratings
                .Select(p => new ProductWithRatingDTO
                {
                    id = p.ProductId,
                    Name = p.Name,
                    Price = p.Price,
                    Quantity = p.Quantity,
                    CategoryID = p.CategoryID,
                    ImgUrl = p.ImgUrl,
                    Title = p.Title,
                    Description = p.Description,
                    Type = p.Type,
                    Stock = p.Stock,
                    PrevPrice = p.PrevPrice,
                    Discount = p.Discount,
                    TotalPrice = p.TotalPrice,
                    Rate = p.Ratings.Rate,
                    RatingCount = p.Ratings.Count
                })
                .ToList();
        }

        public List<ProductWithRatingDTO> GetProductsWithRatings(string title)
        {
            return context.Products
                  .Include(p => p.Ratings) // Eager loading of Ratings
                  .Where(p=>p.Title == title)
                  .Select(p => new ProductWithRatingDTO
                  {
                      id = p.ProductId,
                      Name = p.Name,
                      Price = p.Price,
                      Quantity = p.Quantity,
                      CategoryID = p.CategoryID,
                      ImgUrl = p.ImgUrl,
                      Title = p.Title,
                      Description = p.Description,
                      Type = p.Type,
                      Stock = p.Stock,
                      PrevPrice = p.PrevPrice,
                      Discount = p.Discount,
                      TotalPrice = p.TotalPrice,

                      Rate = p.Ratings.Rate,
                      RatingCount = p.Ratings.Count
                  })
                  .ToList();
        }

        public List<ProductWithRatingDTO2> GetProductsWithRatings2(string title)
        {
            return context.Products
                .Include(p => p.Ratings) // Eager load Ratings
                .Where(p => p.Title == title)
                .Select(p => new ProductWithRatingDTO2
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    Price = p.Price,
                    count = p.Count,
                    Quantity = p.Quantity,
                    CategoryID = p.CategoryID,
                    ImgUrl = p.ImgUrl,
                    Title = p.Title,
                    Description = p.Description,
                    Type = p.Type,
                    Stock = p.Stock,
                    PrevPrice = p.PrevPrice,
                    Discount = p.Discount,
                    TotalPrice = p.TotalPrice,

                    // Map the Ratings
                    Ratings = p.Ratings != null
                            ? new RatingsDTO
                            {
                                Rate = p.Ratings.Rate,
                                Count = p.Ratings.Count ?? 0 // handle null count
                            }
                            : null
                    })
                .ToList();
        }
    }
}
