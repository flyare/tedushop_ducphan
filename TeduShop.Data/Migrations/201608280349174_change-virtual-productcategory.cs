namespace TeduShop.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changevirtualproductcategory : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Products", "CategoryID");
            AddForeignKey("dbo.Products", "CategoryID", "dbo.ProductCategories", "ID", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Products", "CategoryID", "dbo.ProductCategories");
            DropIndex("dbo.Products", new[] { "CategoryID" });
        }
    }
}
