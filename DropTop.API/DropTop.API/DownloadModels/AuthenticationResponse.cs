using DropTop.API.Models;
using System;

namespace DropTop.API.DownloadModels
{
    public class AuthenticationResponse
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }

        public AuthenticationResponse(User user, string token)
        {
            Id = user.Id;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Email = user.Email;
            Token = token;
        }
    }
}
