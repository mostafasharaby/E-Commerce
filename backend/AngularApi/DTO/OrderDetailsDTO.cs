namespace AngularApi.DTO
{
    public class OrderDetailsDTO
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public string? UserName { get; set; }
        
        public decimal? Total { get; set; }

        public int? PaymentId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
