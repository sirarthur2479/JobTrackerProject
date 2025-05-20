using System;

namespace JobTrackerApi.Models
{
    public class JobApplication
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Position { get; set; }
        public string Status { get; set; } // e.g. Applied, Interview, Offer, Rejected
        public DateTime DateApplied { get; set; }
    }
}
