using TeduShop.Data.Infrastructure;
using TeduShop.Model.Models;

namespace TeduShop.Data.Repositories
{
    public class PostCategoryRepository: RepositoryBase<PostCategory>
    {
        public PostCategoryRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}