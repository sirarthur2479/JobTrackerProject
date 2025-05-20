using JobTrackerApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JobTrackerApi.Repositories
{
    public interface IApplicationRepository
    {
        Task<IEnumerable<JobApplication>> GetAllAsync();
        Task<JobApplication?> GetByIdAsync(int id);
        Task AddAsync(JobApplication application);
        Task UpdateAsync(JobApplication application);
        Task SaveChangesAsync();
    }
}
