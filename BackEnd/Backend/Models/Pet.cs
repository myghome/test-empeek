namespace Backend.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Web.Script.Serialization;

    public partial class Pet
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [StringLength(2147483647)]
        public string Name { get; set; }
        [ForeignKey("User")]
        public long UserId { get; set; }
      
        public virtual User User { get; set; }
    }
}
