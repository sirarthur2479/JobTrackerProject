Job Application Tracker – Backend API
=====================================

This is the backend API for the Job Application Tracker, built with ASP.NET Core Web API and Entity Framework Core (using SQLite). 
It provides RESTful endpoints for managing job applications — including creating, updating, listing, and deleting.
Development done in Visual Studio 2022
Version control done in GitHub

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
   http://localhost:5005/swagger

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
- Frontend (React) will consume the API



Job Application Tracker - Frontend (React)
==========================================

Description
-----------
This is the React frontend for the Job Application Tracker. It displays job applications in a table with support for add, edit, delete, pagination, and validation.
Development done in VSCode

Tech Stack
----------
- React (Create React App)
- Axios for API calls
- CSS for styling (responsive layout)
- ESLint + Prettier for linting and formatting

Requirements
------------
- Node.js (v16 or later)
- npm

How to Run
----------
1. Navigate to the frontend project folder:
    cd JobTrackerUi

2. Install dependencies:
    npm install

3. Start the development server:
    npm start

4. The app will open at:
    http://localhost:3000

Notes
-----
- App supports responsive layout for mobile and desktop.
- Table always displays 5 rows per page.
- Validation errors are shown clearly for both add and edit actions when submitting empty fields in the form or table.
- Pagination state is preserved across actions (add = jump to last page, others = stay current page, load = jump to page 1).


Assumptions
-----------

- Users interact with the application through a simple, single-user frontend.
- No authentication or user roles are implemented; all data is globally accessible.
- The backend is persisted using SQLite.
- The application will run locally; no deployment configuration is included.
- Date applied is set automatically in the backend and not user-editable.
- Form validation ensures required fields are provided; no advanced validation (e.g., regex, length limits) is enforced.
- Table displays 5 rows per page for consistency; pagination is client-side.
- API endpoints follow RESTful conventions and return standard HTTP codes.