Job Application Tracker – Backend API
=====================================

This is the backend API for the Job Application Tracker, built with ASP.NET Core Web API and Entity Framework Core (using SQLite). 
It provides RESTful endpoints for managing job applications — including creating, updating, listing, and deleting.

Technologies Used
-----------------
- ASP.NET Core 8
- Entity Framework Core (SQLite)
- Repository Pattern & Dependency Injection
- Swagger UI for API documentation
- xUnit & Moq for unit testing

Getting Started
---------------
Prerequisites:
- .NET 8 SDK

How to Run the API:
1. Clone the repository:
   git clone https://github.com/sirarthur2479/JobTrackerProject.git
   cd JobTrackerProject/JobTrackerApi

2. Restore packages:
   dotnet restore

3. Build the project:
   dotnet build

4. Run the API:
   dotnet run

5. Visit Swagger UI:
   http://localhost:<port>/swagger

Note: The app uses SQLite (jobtracker.db) and applies migrations + seed data automatically on startup.

API Endpoints
-------------
GET     /applications         - List all job applications
GET     /applications/{id}    - Get a specific job application
POST    /applications         - Add a new application
PUT     /applications/{id}    - Update status of an application
DELETE  /applications/{id}    - Delete an application

Running Tests
-------------
From the solution root JobTrackerProject, run:
   cd JobTrackerApi.Tests
   dotnet test

This will run all xUnit tests, including mocked controller logic and optional repository integration tests.

Seeded Sample Data
------------------
When the API starts, it seeds the database with:

- BlueSky    - Backend Developer    - Applied
- Datacom    - Full Stack           - Interview
- IWork      -Software Engineer     - Offer

Project Structure
-----------------
JobTrackerApi/
├── Controllers/         (API endpoints)
├── Data/                (ApplicationDbContext)
├── Models/              (JobApplication model)
├── Repositories/        (Repository & interface)
├── Migrations/          (EF Core migrations)
└── Program.cs           (App startup and DI config)

Git Ignore Notes
----------------
The following files are excluded from Git:

- jobtracker.db (SQLite database)
- *.db-wal, *.db-shm
- /bin/, /obj/, .vscode/, node_modules/

Assumptions
-----------
- No authentication or authorization is required
- Database is local and resets if deleted
- Frontend (React or Angular) will consume the API
