using JobTrackerApi.Data;
using JobTrackerApi.Models;
using JobTrackerApi.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// SQLite
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=jobtracker.db"));

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Dependency Injection for Repositories
builder.Services.AddScoped<IApplicationRepository, ApplicationRepository>();

var app = builder.Build();

// Enable Swagger middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();


SeedDatabase(app);

app.Run();

void SeedDatabase(IHost app)
{
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        db.Database.Migrate();

        if (!db.JobApplications.Any())
        {
            db.JobApplications.AddRange(
                new JobApplication
                {
                    CompanyName = "BlueSky",
                    Position = "Backend Developer",
                    Status = "Applied",
                    DateApplied = DateTime.UtcNow.AddDays(-3)
                },
                new JobApplication
                {
                    CompanyName = "Datacom",
                    Position = "Full Stack Developer",
                    Status = "Interview",
                    DateApplied = DateTime.UtcNow.AddDays(-7)
                },
                new JobApplication
                {
                    CompanyName = "IWork",
                    Position = "Software Engineer",
                    Status = "Offer",
                    DateApplied = DateTime.UtcNow.AddDays(-1)
                }
            );

            db.SaveChanges();
        }
    }
}



