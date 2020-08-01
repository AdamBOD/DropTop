using System.ComponentModel.DataAnnotations;

namespace DropTop.API.UploadModels
{
    public class AuthenticationRequest
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
