using JobTrackerApi.Models;
using JobTrackerApi.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace JobTrackerApi.Controllers
{
    [ApiController]
    [Route("applications")]
    public class ApplicationsController : ControllerBase
    {
        private readonly IApplicationRepository _repository;

        public ApplicationsController(IApplicationRepository repository)
        {
            _repository = repository;
        }

        // GET /applications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetAll()
        {
            var apps = await _repository.GetAllAsync();
            return Ok(apps);
        }

        // GET /applications/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<JobApplication>> GetById(int id)
        {
            var app = await _repository.GetByIdAsync(id);
            if (app == null)
                return NotFound();
            return Ok(app);
        }

        // POST /applications
        [HttpPost]
        public async Task<ActionResult<JobApplication>> Create(JobApplication application)
        {
            if (string.IsNullOrWhiteSpace(application.CompanyName) ||
                string.IsNullOrWhiteSpace(application.Position))
            {
                return BadRequest("Company Name and Position are required.");
            }

            application.DateApplied = DateTime.UtcNow;
            application.Status = application.Status ?? "Applied";

            await _repository.AddAsync(application);
            await _repository.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = application.Id }, application);
        }

        // PUT /applications/{id} - Update status (optional)
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, JobApplication updatedApp)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            // Update only relevant fields
            existing.Status = updatedApp.Status ?? existing.Status;

            await _repository.Update(existing);
            await _repository.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var app = await _repository.GetByIdAsync(id);
            if (app == null)
                return NotFound();

            await _repository.Delete(app);
            await _repository.SaveChangesAsync();

            return NoContent();
        }

    }
}
