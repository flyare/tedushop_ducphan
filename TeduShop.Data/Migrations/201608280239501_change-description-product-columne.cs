namespace TeduShop.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changedescriptionproductcolumne : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Products", "Description", c => c.String());
            DropColumn("dbo.Products", "Decription");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Products", "Decription", c => c.String());
            DropColumn("dbo.Products", "Description");
        }
    }
}
