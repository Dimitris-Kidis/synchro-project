using Core.Domain.Entities;
using System.Linq.Expressions;

namespace Core.Repositories.SynchroRepository
{
    public interface ISynchroRepository<TEntity> where TEntity : BaseEntity
    {
        Task<bool> ExistsAsync(Guid id, CancellationToken cancellationToken = default);
        Task<TEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task<TEntity> AddAsync(TEntity entity, CancellationToken cancellationToken = default);
        Task<TEntity> UpdateAsync(TEntity entity, CancellationToken cancellationToken = default);
        Task DeleteAsync(TEntity entity, CancellationToken cancellationToken = default);
        Task AddRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default);
        IQueryable<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate);
        Task UpdateRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default);
        Task DeleteRangeAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default);
        IQueryable<TEntity> GetAll();
        Task<TEntity?> GetWithIncludeAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken = default, params Expression<Func<TEntity, object>>[] includes);
        IQueryable<TEntity> GetListWithInclude(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includes);
    }
}