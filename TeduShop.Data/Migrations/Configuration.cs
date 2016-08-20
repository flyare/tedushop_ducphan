using System;
using System.Collections.Generic;
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
            CreateProductCategorySample(context);
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

            /*var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new TeduShopDbContext()));
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

            var postCategory = new PostCategory
            {
                Name = "test",
                Alias = "Test"
            };
            context.PostCategories.Add(postCategory);
            context.SaveChanges();*/
        }

        private void CreateProductCategorySample(TeduShopDbContext context)
        {
            if (context.ProductCategories.Count() != 0) return;

            var list = new List<ProductCategory>()
            {
                new ProductCategory() { Name = "Dien Lanh", Alias = "dien-lanh", Status = true},
                new ProductCategory() { Name = "Vien Thong", Alias = "vien-thong", Status = true},
                new ProductCategory() { Name = "Do Gia Dung", Alias = "Do-Gia-Dung", Status = true},
                new ProductCategory() { Name = "My Pham", Alias = "My-Pham", Status = true},
                new ProductCategory() { Name = "Smart Phone", Alias = "Smart-Phone", Status = true},
                new ProductCategory() { Name = "Oto", Alias = "Oto", Status = true},
                new ProductCategory() { Name = "May Cong Nghiep", Alias = "May-Cong-Nghiep", Status = true},
                new ProductCategory() { Name = "May Nong Nghiep", Alias = "May-Nong-Nghiep", Status = true},
                new ProductCategory() { Name = "Do choi tre em", Alias = "Do-choi-tre-em", Status = true},
                new ProductCategory() { Name = "May mac", Alias = "May-mac", Status = true}
            };

            context.ProductCategories.AddRange(list);
            context.SaveChanges();
        }
    }
}