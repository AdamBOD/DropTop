using DropTop.API.Models;
using DropTop.API.Services;
using DropTop.API.UploadModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DropTop.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class DropController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        public DropController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet("drops")]
        public async Task<List<Drop>> GetDrops(string userId)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                return null;
            }

            var context = new DropTopContext();

            var drops = await context.Drop.Where(d => d.CreatedBy == Guid.Parse(userId) && d.Deleted == false).ToListAsync();

            return drops;
        }

        [HttpGet("drops/drop")]
        public async Task<Drop> GetDrop(string userId, string dropId)
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(dropId))
            {
                return null;
            }

            var context = new DropTopContext();

            var drop = await context.Drop.Where(d => d.CreatedBy == Guid.Parse(userId) && d.Id == Guid.Parse(dropId) && d.Deleted == false).FirstOrDefaultAsync();

            return drop;
        }

        [HttpPost("drop")]
        public async Task<IActionResult> Post(DropUploadModel drop)
        {
            var context = new DropTopContext();

            var newDrop = new Drop()
            {
                Id = Guid.NewGuid(),
                Name = drop.Name,
                Data = drop.Data,
                CreatedOn = DateTime.Now,
                CreatedBy = Guid.Parse(drop.CreatedBy)
            };

            await context.Drop.AddAsync(newDrop);
            await context.SaveChangesAsync();

            return Ok();
        }
    }
}
