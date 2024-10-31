using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AngularApi.DTO;

namespace AngularApi.Models
{
    public class AngularDbContext: IdentityDbContext<User>
    {
      
            public AngularDbContext() { }
            public AngularDbContext(DbContextOptions<AngularDbContext> options) : base(options) { }
    
            public DbSet<Product> Products { get; set; }
            public DbSet<Category> Categories { get; set; }
            public DbSet<OrderDetails> OrderDetails { get; set; }
            public DbSet<OrderItem> OrderItems { get; set; }
            public DbSet<PaymentDetails> PaymentDetails { get; set; }
            public DbSet<ShoppingSession> ShoppingSessions { get; set; }
           // public DbSet<Wishlist> Wishlists { get; set; }
            public DbSet<ProductImage> ProductImages { get; set; }
            public DbSet<CartItem> CartItems { get; set; }
            public DbSet<WishListProducts> WishListProducts { get; set; }

          
        public DbSet<Delivery> Delivery { get; set; }        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
                base.OnConfiguring(optionsBuilder);
                optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=MegaMarketApi;Integrated Security=True;Encrypt=True;Trust Server Certificate=True;");
            }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<OrderDetails>()
                .HasOne(od => od.Delivery)
                .WithOne(d => d.Order)
                .HasForeignKey<OrderDetails>(od => od.DeliveryId) 
                .OnDelete(DeleteBehavior.Cascade); 
        }


        public DbSet<AngularApi.DTO.Cart> Cart { get; set; } = default!;
        public DbSet<AngularApi.DTO.WishItems> WishItems { get; set; } = default!;
        
    }
}
