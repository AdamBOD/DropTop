using System;
using System.Collections.Generic;

namespace DropTop.API.Models
{
    public partial class Drop
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Data { get; set; }
        public DateTime CreatedOn { get; set; }
        public Guid CreatedBy { get; set; }
        public bool Deleted { get; set; }
    }
}
