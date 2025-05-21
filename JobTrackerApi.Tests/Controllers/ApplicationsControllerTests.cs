using JobTrackerApi.Controllers;
using JobTrackerApi.Models;
using JobTrackerApi.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Xunit;

namespace JobTrackerApi.Tests.Controllers
{
    public class ApplicationsControllerTests
    {
        private readonly Mock<IApplicationRepository> _mockRepo;
        private readonly ApplicationsController _controller;

        public ApplicationsControllerTests()
        {
            _mockRepo = new Mock<IApplicationRepository>();
            _controller = new ApplicationsController(_mockRepo.Object);
        }

        [Fact]
        public async Task GetAll_ReturnsOk_WithList()
        {
            // Arrange
            var apps = new List<JobApplication>
            {
                new JobApplication { Id = 1, CompanyName = "Datacom", Position = "Backend Dev", Status = "Applied" }
            };
            _mockRepo.Setup(repo => repo.GetAllAsync()).ReturnsAsync(apps);

            // Act
            var result = await _controller.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsAssignableFrom<IEnumerable<JobApplication>>(okResult.Value);
            Assert.Single(returnValue);
        }

        [Fact]
        public async Task GetById_ReturnsNotFound_WhenApplicationDoesNotExist()
        {
            // Arrange
            _mockRepo.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((JobApplication?)null);

            // Act
            var result = await _controller.GetById(1);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Theory]
        [InlineData("", "Dev")]
        [InlineData("Datacom", "")]
        public async Task Create_ReturnsBadRequest_WhenMissingFields(string company, string position)
        {
            // Arrange
            var app = new JobApplication
            {
                CompanyName = company,
                Position = position,
                Status = "Applied"
            };

            // Act
            var result = await _controller.Create(app);

            // Assert
            var badRequest = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal(StatusCodes.Status400BadRequest, badRequest.StatusCode);
        }


        [Fact]
        public async Task Create_ReturnsCreated_WhenValid()
        {
            // Arrange
            var newApp = new JobApplication
            {
                CompanyName = "Datacom",
                Position = "Backend Developer",
                Status = "Applied"
            };

            _mockRepo.Setup(repo => repo.AddAsync(It.IsAny<JobApplication>())).Returns(Task.CompletedTask);
            _mockRepo.Setup(repo => repo.SaveChangesAsync()).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.Create(newApp);

            // Assert
            var createdAt = Assert.IsType<CreatedAtActionResult>(result.Result);
            var app = Assert.IsType<JobApplication>(createdAt.Value);
            Assert.Equal("Visa", app.CompanyName);
            Assert.Equal("Applied", app.Status); // Should default to "Applied"
        }

        [Fact]
        public async Task Update_ReturnsNotFound_WhenApplicationDoesNotExist()
        {
            // Arrange
            _mockRepo.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync((JobApplication?)null);

            // Act
            var result = await _controller.Update(1, new JobApplication { Id = 1, CompanyName = "Datacom", Position = "Backend Dev", Status = "Applied" });

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Update_ReturnsNoContent_WhenSuccessful()
        {
            // Arrange
            var existing = new JobApplication
            {
                Id = 1,
                CompanyName = "Datacom",
                Position = "Backend Dev",
                Status = "Applied"
            };

            _mockRepo.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(existing);
            _mockRepo.Setup(repo => repo.Update(It.IsAny<JobApplication>())).Returns(Task.CompletedTask);
            _mockRepo.Setup(repo => repo.SaveChangesAsync()).Returns(Task.CompletedTask);

            var updated = new JobApplication
            {
                Id = 1,
                CompanyName = "Datacom",
                Position = "Backend Dev",
                Status = "Interview"
            };

            // Act
            var result = await _controller.Update(1, updated);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public void JobApplicationModel_Invalid_WhenRequiredFieldsMissing()
        {
            var app = new JobApplication
            {
                CompanyName = "",  // Invalid
                Position = null!,  // Invalid
                Status = "Applied"
            };

            var context = new ValidationContext(app, null, null);
            var results = new List<ValidationResult>();

            bool isValid = Validator.TryValidateObject(app, context, results, true);

            Assert.False(isValid);
            Assert.Contains(results, r => r.MemberNames.Contains(nameof(JobApplication.CompanyName)));
        }




    }
}
