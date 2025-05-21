using System;
using System.ComponentModel.DataAnnotations;

namespace JobTrackerApi.Models
{
    public class JobApplication
    {
        public int Id { get; set; }

        [Required]
        public string CompanyName { get; set; } = string.Empty;

        [Required]
        public string Position { get; set; } = string.Empty;

        [Required]
        public string Status { get; set; } = "Applied"; // e.g. Applied, Interview, Offer, Rejected

        public DateTime DateApplied { get; set; }
    }
}
