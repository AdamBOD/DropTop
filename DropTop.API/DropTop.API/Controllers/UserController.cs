using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using DropTop.API.Models;
using DropTop.API.Services;
using DropTop.API.UploadModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DropTop.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpPost("auth")]
        [AllowAnonymous]
        public async Task<IActionResult> Authenticate(AuthenticationRequest authenticationRequest)
        {
            var response = await _userService.AuthenticateAsync(authenticationRequest);
            

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [HttpGet]
        public async Task<User> Get(string userId)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                return null;
            }

            var context = new DropTopContext();

            var user = await context.User.Where(u => u.Id == Guid.Parse(userId)).FirstOrDefaultAsync();

            return user;
        }

        [HttpPost]
        public async Task<IActionResult> Post(UserUploadModel user)
        {
            var context = new DropTopContext();

            MD5CryptoServiceProvider md5Hasher = new MD5CryptoServiceProvider();
            Byte[] hashedPassword;
            UTF8Encoding encoder = new UTF8Encoding();
            hashedPassword = md5Hasher.ComputeHash(encoder.GetBytes(user.Password));

            var newUser = new User()
            {
                Id = Guid.NewGuid(),
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = hashedPassword,
                Verified = true,
                Temporary = false,
                CreatedOn = DateTime.Now
            };

            await context.User.AddAsync(newUser);
            await context.SaveChangesAsync();

            return Ok();
        }
    }
}
