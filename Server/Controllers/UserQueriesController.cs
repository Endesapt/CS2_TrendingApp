using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Helpers;
using Server.Services.Interfaces;
using System.Security.Claims;
using WeaponsClassLibrary;

namespace Server.Controllers
{
    public class UserQueriesController: Controller
    {
        private readonly IUserQueryService _userQueryService;
        private readonly IMapper _mapper;
        private readonly long _userId;
        public UserQueriesController(IUserQueryService uqs, IMapper mapper, IHttpContextAccessor httpContextAccessor) { 
            _userQueryService = uqs;
            _mapper = mapper;
            var user= httpContextAccessor.HttpContext!.User;
            var userIdString = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!ExtractIdHelper.ExtractedIdFromClaim(userIdString, out var userId)) userId = -1;
        }
        [HttpPost("/addQuery")]
        public async Task<ActionResult<UserQuery>> AddQuery(UserQueryDto userQuery)
        {
            if (_userId == -1) return BadRequest("Cannot get userId from authClaims");
            var query = _mapper.Map<UserQueryDto, UserQuery>(userQuery);
            query.UserId = _userId;
            UserQuery? result = await _userQueryService.AddQuery(query);
            if (result is null) return BadRequest("Cannot add query");
            return Ok(result);
        }
        [HttpDelete("/deleteQuery")]
        public async Task<IActionResult> DeleteQuery(Guid queryId)
        {
            if (_userId == -1) return BadRequest("Cannot get userId from authClaims");
            var isGood=await _userQueryService.DeleteQuery(queryId,_userId);
            if (!isGood) return BadRequest("You can't delete this query");
            return Ok();
        }
        [HttpPut("/updateQuery")]
        public async Task<ActionResult<UserQuery>> UpdateQuery(UserQueryDto userQuery,Guid queryId) {
            if (_userId == -1) return BadRequest("Cannot get userId from authClaims");
            var query = _mapper.Map<UserQueryDto, UserQuery>(userQuery);
            query.UserId = _userId;
            query.Id = queryId;
            (UserQuery? result,bool isGood) = await _userQueryService.UpdateQuery(query);
            if (!isGood || result is null) return BadRequest("You can't modify this query");
            return Ok(result);
        }
        [HttpGet("/getQueries")]
        public ActionResult<IEnumerable<UserQuery>> GetQueries()
        {
            if (_userId == -1) return BadRequest("Cannot get userId from authClaims");
            var result = _userQueryService.GetQueries(_userId);
            return Ok(result);
        }
    }
}
