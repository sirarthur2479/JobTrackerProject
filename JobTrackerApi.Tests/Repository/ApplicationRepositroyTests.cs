using Xunit;
using Microsoft.EntityFrameworkCore;
using JobTrackerApi.Data;
using JobTrackerApi.Models;
using JobTrackerApi.Repositories;
using System.Threading.Tasks;

namespace JobTrackerApi.Tests.Repositories
{
    public class ApplicationRepositoryTests
    {
        private readonly ApplicationDbContext _context;
        private readonly ApplicationRepository _repository;

        public ApplicationRepositoryTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("JobAppTestDb")
                .Options;

            _context = new ApplicationDbContext(options);
            _repository = new ApplicationRepository(_context);
        }

        [Fact]
        public async Task AddAsync_AddsJobApplication()
        {
            // Arrange
            var app = new JobApplication
            {
                CompanyName = "Datacom",
                Position = "Dev",
                Status = "Applied",
                DateApplied = DateTime.UtcNow
            };

            // Act
            await _repository.AddAsync(app);
            await _repository.SaveChangesAsync();

            // Assert
            var fromDb = await _repository.GetByIdAsync(app.Id);
            Assert.NotNull(fromDb);
            Assert.Equal("Datacom", fromDb!.CompanyName);
        }

        [Fact]
        public async Task GetAllAsync_ReturnsAllItems()
        {
            var result = await _repository.GetAllAsync();
            Assert.IsAssignableFrom<IEnumerable<JobApplication>>(result);
        }
    }
}
