using System;
using System.Text.Json.Serialization;

namespace DropTop.API.Models
{
    public partial class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        [JsonIgnore]
        public byte[] Password { get; set; }
        public bool Verified { get; set; }
        public bool Temporary { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
