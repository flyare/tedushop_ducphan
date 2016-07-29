using TeduShop.Data.Infrastructure;
using TeduShop.Model.Models;

namespace TeduShop.Data.Repositories
{
    public class TagRepository : RepositoryBase<Tag>
    {
        public TagRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}