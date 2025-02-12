using Common.Exceptions;
using Core.Interfaces;
using Core.Repositories.SynchroRepository;

namespace Core.Services.EntityValidator;

public sealed class EntityValidatorService<TEntity>(ISynchroRepository<TEntity> synchroRepository) : IEntityValidatorService<TEntity> where TEntity : IBaseEntity
{
    private readonly ISynchroRepository<TEntity> synchroRepository = synchroRepository ?? throw new ArgumentNullException(nameof(synchroRepository));

    public async Task EntityExistsAsync(Guid entityId, CancellationToken token)
    {
        string entityName = typeof(TEntity).Name;

        if (entityId == Guid.Empty)
        {
            throw new BusinessValidationException($"Please provide a valid {entityName}Id");
        }

        bool entityExists = await synchroRepository.ExistsAsync(entityId, token);

        if (!entityExists)
        {
            throw GetNotExistException(entityId, entityName);
        }
    }

    public void EntityExists(TEntity? entity, Guid entityId)
    {
        string entityName = typeof(TEntity).Name;
        if (entity is null)
        {
            throw GetNotExistException(entityId, entityName);
        }
    }

    private static EntityNotExistsException GetNotExistException(Guid entityId, string entityName)
    {
        return new EntityNotExistsException($"{entityName} with given id '{entityId}' does not exist in the database.");
    }
}
