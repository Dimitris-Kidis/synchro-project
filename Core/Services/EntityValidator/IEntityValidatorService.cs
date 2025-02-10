using Core.Domain.Entities;

namespace Core.Services.EntityValidator;

public interface IEntityValidatorService<TEntity> where TEntity : BaseEntity
{
    Task EntityExistsAsync(Guid entityId, CancellationToken token);
    void EntityExists(TEntity? entity, Guid entityId);
}
