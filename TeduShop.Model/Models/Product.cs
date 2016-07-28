using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;
using TeduShop.Model.Abstract;

namespace TeduShop.Model.Models
{
    [Table("Products")]
    public class Product : Auditable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Alias { get; set; }

        [Required]
        public int CategoryID { get; set; }

        public string Image { get; set; }

        [Column(TypeName = "xml")]
        public string MoreImages { get; set; }
        public decimal Price { get; set; }
        public decimal? PromotionPrice { get; set; }
        public int Warranty { get; set; }
        public string Decription { get; set; }
        public string Content { get; set; }
        public bool? HomeFlag { get; set; }
        public bool? HotFlag { get; set; }
        public int? ViewCount { get; set; }

        [ForeignKey("CategoryID")]
        public virtual IEnumerable ProductCategory { get; set; }
    }
}