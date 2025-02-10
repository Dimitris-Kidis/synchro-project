using Core.Domain;
using Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Core.Repositories.UserRepository;

public class UserRepository(SynchroDbContext dbContext) : IUserRepository
{
    private readonly SynchroDbContext _dbContext = dbContext;

    public Task<bool> ExistsAsync(string email, CancellationToken cancellationToken)
    {
        return _dbContext.Users.AsNoTracking().AnyAsync(x => x.Email == email, cancellationToken);
    }

    public async Task<List<User>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _dbContext.Users.ToListAsync(cancellationToken);
    }

    public async Task<User?> GetWithIncludeAsync(
        Expression<Func<User, bool>> predicate,
        CancellationToken cancellationToken = default,
        params Expression<Func<User, object>>[] includes)
    {
        var query = _dbContext.Users.Where(predicate);
        query = includes.Aggregate(query, (current, include) => current.Include(include));
        return await query.FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Users.FindAsync([id], cancellationToken);
    }

    public async Task<User> AddAsync(User entity, CancellationToken cancellationToken = default)
    {
        await _dbContext.Users.AddAsync(entity, cancellationToken);
        await SaveAsync(cancellationToken);
        return entity;
    }

    public async Task<User> UpdateAsync(User entity, CancellationToken cancellationToken = default)
    {
        _dbContext.Users.Update(entity);
        await SaveAsync(cancellationToken);
        return entity;
    }

    public async Task DeleteAsync(User entity, CancellationToken cancellationToken = default)
    {
        _dbContext.Users.Remove(entity);
        await SaveAsync(cancellationToken);
    }

    public async Task DeleteRangeAsync(IEnumerable<User> entities, CancellationToken cancellationToken = default)
    {
        _dbContext.Users.RemoveRange(entities);
        await SaveAsync(cancellationToken);
    }

    public async Task<IEnumerable<User>> FindByAsync(
        Expression<Func<User, bool>> predicate,
        CancellationToken cancellationToken = default)
    {
        return await _dbContext.Users.Where(predicate).ToListAsync(cancellationToken);
    }

    private async Task SaveAsync(CancellationToken cancellationToken = default)
    {
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}