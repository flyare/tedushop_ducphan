using System;
using System.Data.Entity.Migrations;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using TeduShop.Model.Models;

namespace TeduShop.Data.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<TeduShopDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(TeduShopDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new TeduShopDbContext()));
            var roleManage = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new TeduShopDbContext()));
            var user = new ApplicationUser
            {
                UserName = "tedu",
                Email = "itphanhoangduc@gmail.com",
                EmailConfirmed = true,
                BirthDay = DateTime.Now,
                FullName = "Duc Phan Hoang"
            };
            manager.Create(user, "123456$");

            if (!roleManage.Roles.Any())
            {
                roleManage.Create(new IdentityRole {Name = "Admin"});
                roleManage.Create(new IdentityRole {Name = "User"});
            }

            var adminUser = manager.FindByEmail("itphanhoangduc@gmail.com");
            manager.AddToRoles(adminUser.Id, "Admin", "User");
        }
    }
}