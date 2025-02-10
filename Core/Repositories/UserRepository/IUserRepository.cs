using Core.Domain.Entities;
using System.Linq.Expressions;

namespace Core.Repositories.UserRepository;

public interface IUserRepository
{
    Task<bool> ExistsAsync(string email, CancellationToken cancellationToken);
    Task<List<User>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<User?> GetWithIncludeAsync(Expression<Func<User, bool>> predicate, CancellationToken cancellationToken = default, params Expression<Func<User, object>>[] includes);
    Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<User> AddAsync(User entity, CancellationToken cancellationToken = default);
    Task<User> UpdateAsync(User entity, CancellationToken cancellationToken = default);
    Task DeleteAsync(User entity, CancellationToken cancellationToken = default);
    Task DeleteRangeAsync(IEnumerable<User> entities, CancellationToken cancellationToken = default);
    Task<IEnumerable<User>> FindByAsync(Expression<Func<User, bool>> predicate, CancellationToken cancellationToken = default);
}