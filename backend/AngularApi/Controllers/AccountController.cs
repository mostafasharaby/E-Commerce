using AngularApi.DTO;
using AngularApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
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
                            expires: DateTime.Now.AddHours(2),
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


        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDTO forgotPasswordDto)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.FindByEmailAsync(forgotPasswordDto.Email);
                if (user == null)
                {
                    return Ok(new { message = "If an account with that email exists, a reset link has been sent." });
                }

                var resetToken = await userManager.GeneratePasswordResetTokenAsync(user);
                var encodedToken = WebUtility.UrlEncode(resetToken);

                var resetLink = Url.Action(
                    "ResetPassword",
                    "Account",
                    new { token = encodedToken, email = user.Email },
                    Request.Scheme);

                try
                {
                    var smtpClient = new SmtpClient("smtp.example.com")
                    {
                        Port = 587,
                        Credentials = new NetworkCredential("mustafasharaby18@gmail.com", "01200798407"),
                        EnableSsl = true,
                    };

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress("mustafasharaby18@gmail.com"),
                        Subject = "Password Reset",
                        Body = $"Click the link to reset your password: {resetLink}",
                        IsBodyHtml = true,
                    };

                    mailMessage.To.Add(user.Email);

                    await smtpClient.SendMailAsync(mailMessage);

                    // Log success (optional)
                    Console.WriteLine($"Reset link sent to {user.Email}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Failed to send email: {ex.Message}");
                    return StatusCode(500, new { message = "Failed to send email. Please try again later." });
                }


                Console.WriteLine($"Generated Reset Link: {resetLink}");
                return Ok(new { resetLink });
            }

            return BadRequest(ModelState);
        }

        // "newPassword": "2228*88aAA"
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDTO resetPasswordDto)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.FindByEmailAsync(resetPasswordDto.Email);
                if (user == null)
                {
                    return BadRequest(new { message = "Invalid request." });
                }

                var decodedToken = WebUtility.UrlDecode(resetPasswordDto.Token);
                var result = await userManager.ResetPasswordAsync(user, decodedToken, resetPasswordDto.NewPassword);

                if (result.Succeeded)
                {
                    return Ok(new { message = "Password has been reset successfully." });
                }

                Console.WriteLine($"Errors: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                return BadRequest(result.Errors.FirstOrDefault()?.Description);
            }

            return BadRequest(ModelState);
        }



    }

}
