using Google.Apis.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WeatherAPI.Models;

namespace WeatherAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppSettings _applicationSettings;
        private readonly ILogger<WeatherForecastController> _logger;
        public AuthController(ILogger<WeatherForecastController> logger,IOptions<AppSettings> _applicationSettings)
        {
            _logger = logger;
            this._applicationSettings = _applicationSettings.Value;
        }


        protected dynamic JWTGenerator(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this._applicationSettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.UserName), new Claim(ClaimTypes.Role, user.Role),
                        new Claim(ClaimTypes.DateOfBirth, user.BirthDay)}),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encrypterToken = tokenHandler.WriteToken(token);

            HttpContext.Response.Cookies.Append("token", encrypterToken,
                 new CookieOptions
                 {
                     Expires = DateTime.Now.AddDays(7),
                     HttpOnly = true,
                     Secure = true,
                     IsEssential = true,
                     SameSite = SameSiteMode.None
                 });

            return new { token = encrypterToken, username = user.UserName };
        }


        [HttpPost("LoginWithGoogle")]
        public async Task<IActionResult> LoginWithGoogle([FromBody] FromBodyModel credential)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string> { this._applicationSettings.GoogleClientId }
                };

                var payload = await GoogleJsonWebSignature.ValidateAsync(credential.Key, settings);

                //Get the user details from DB to use it in UI
                var user = new User() { UserName = "Sadd", Role = "dasdsad", BirthDay = "38" };
                // Always return true for the demo 
                if (user != null)
                {
                    return Ok(JWTGenerator(user));
                }
                else
                {
                    return BadRequest();
                }
            }catch (HttpRequestException e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
                _logger.LogError(e.Message);
                return StatusCode(500, e.Message);
            }

        }        
    }
}
