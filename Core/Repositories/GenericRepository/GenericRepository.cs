using Core.Domain;

namespace Core.Repositories.GenericRepository
{
    public class GenericRepository<T>(SynchroDbContext dbContext) : IGenericRepository<T> where T : class
    {
        protected readonly SynchroDbContext _dbContext = dbContext;

        public IQueryable<T> GetAll()
        {
            return _dbContext.Set<T>();
        }

        public async Task AddAsync(T entity)
        {
            await _dbContext.Set<T>().AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }

        public void UpdateAsync(T entity)
        {
            _dbContext.Set<T>().Update(entity);
            _dbContext.SaveChangesAsync();
        }

        public void DeleteAsync(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
            _dbContext.SaveChangesAsync();
        }
    }
}
