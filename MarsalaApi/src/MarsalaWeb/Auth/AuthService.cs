using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Builder;
using System.Collections.Generic;

namespace WebApplication1.Auth
{
    public interface IAuthService
    {
        string GenerateToken(IEnumerable<Claim> claims);
        SymmetricSecurityKey GetSymmetricSecurityKey();
        JwtBearerOptions GetBearerOptions();
    }

    public class AuthService: IAuthService
    {
        private readonly AuthOptions _authOptions;

        public AuthService(IOptions<AuthOptions> options)
        {
            _authOptions = options.Value;
        }

        public string GenerateToken(IEnumerable<Claim> claims)
        {
            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                           issuer: _authOptions.Issuer,
                           audience: _authOptions.Audience,
                           notBefore: now,
                           claims: claims,
                           expires: now.Add(TimeSpan.FromMinutes(_authOptions.Lifetime)),
                           signingCredentials: new SigningCredentials(GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }

        public JwtBearerOptions GetBearerOptions()
        {
            return new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = _authOptions.Issuer,

                    ValidateAudience = true,
                    ValidAudience = _authOptions.Audience,

                    ValidateLifetime = true,
                    IssuerSigningKey = GetSymmetricSecurityKey(),
                    ValidateIssuerSigningKey = true,
                }
            };
        }

        public SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_authOptions.Key ?? "?"));
        }
    }
}
