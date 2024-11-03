using AngularApi.DTO;
using AngularApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AngularApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class AccountController : ControllerBase
    {

       
        private readonly UserManager<User> userManager;
        private readonly IConfiguration Configuration;

        public AccountController(UserManager<User> _userManager, IConfiguration Configuration)
        {
            userManager = _userManager;
            this.Configuration = Configuration;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUserDTO registerUser)
        {
            if (ModelState.IsValid)
            {
                User appUser = new User();
                appUser.UserName = registerUser.UserName;
                appUser.Email = registerUser.Email;
          
                // appUser.PasswordHash = registerUser.Password;
                IdentityResult result = await userManager.CreateAsync(appUser, registerUser.Password);
                if (result.Succeeded)
                {
                    var role = registerUser.Role ?? "user"; // Default role to "user"
                    await userManager.AddToRoleAsync(appUser, role);

                    return Ok(new { message = "Account created successfully with role." });
                }
                return BadRequest(result.Errors.FirstOrDefault().Description.ToString());

            }
            return BadRequest(ModelState);
        }

       
        [HttpPost("login")]
        public async Task<IActionResult> Login(LogInUserDTO logInUser)
        {
            if (ModelState.IsValid)
            {               
                var found = await userManager.FindByEmailAsync(logInUser.Email);
                if (found != null)
                {
                    User appUser = new User();
                    appUser.Email = logInUser.Email;

                 
                    var checkpass = await userManager.CheckPasswordAsync(found, logInUser.Password);
                    if (checkpass)
                    {
                                          
                        var claim = new List<Claim>
                        {
                            new Claim(ClaimTypes.NameIdentifier, found.Id), 
                            new Claim(ClaimTypes.Email, found.Email),
                            new Claim(ClaimTypes.Name, found.UserName),
                            new Claim(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) 
                        };
                        Console.WriteLine("UserId "+ found.Id);

                        var userId = found.Id;
                        Console.WriteLine("UserId: "+ userId);


                        var role = await userManager.GetRolesAsync(appUser);
                        foreach (var r in role)  
                        {
                            claim.Add(new Claim(ClaimTypes.Role, r));
                        }
                        var roles = await userManager.GetRolesAsync(found);
                        foreach (var roleee in roles)
                        {
                            claim.Add(new Claim(ClaimTypes.Role, roleee));
                        }

                        foreach (var c in claim)
                        {
                            Console.WriteLine($"Claim Type: {c}");
                        }


                       
                        SecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Secret"]));
                        SigningCredentials signing = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                        // Create the token
                        JwtSecurityToken jwtSecurity = new JwtSecurityToken(
                            issuer: Configuration["Jwt:validissuer"],
                            audience: Configuration["Jwt:validaudience"],  
                            claims: claim,
                            expires: DateTime.Now.AddHours(1),
                            signingCredentials: signing
                            );

                        return Ok(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(jwtSecurity),
                            expiration = jwtSecurity.ValidTo
                        });
                    }
                }
                return Unauthorized();
            }
            return BadRequest(ModelState);
        }      

    }

}
