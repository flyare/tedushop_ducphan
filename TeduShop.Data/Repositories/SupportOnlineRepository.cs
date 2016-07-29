using TeduShop.Data.Infrastructure;
using TeduShop.Model.Models;

namespace TeduShop.Data.Repositories
{
    public class SupportOnlineRepository: RepositoryBase<SupportOnline>
    {
        public SupportOnlineRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
    }
}