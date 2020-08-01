using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DropTop.API.UploadModels
{
    public class DropUploadModel
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Data { get; set; }

        public DateTime CreatedOn { get; set; }

        public string CreatedBy { get; set; }
    }
}
