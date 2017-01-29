﻿using System.Security.Claims;

namespace WebApplication1.Auth
{
    public class ApplicationUser : ClaimsIdentity
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public string PasswordHash { get; set; }
        public bool TwoFactorEnabled { get; set; }
    }

    public class ApplicationRole
    {
        public string RoleId { get; set; }
        public string RoleName { get; set; }
    }
}
