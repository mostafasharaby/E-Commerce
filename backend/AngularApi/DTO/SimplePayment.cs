namespace AngularApi.DTO
{
    public class SimplePayment
    {
        public int Id { get; set; }
        public int? OrderId { get; set; }
        public decimal? Amount { get; set; }

        public DateTime CreatedAt { get; set; } 

    }
}
