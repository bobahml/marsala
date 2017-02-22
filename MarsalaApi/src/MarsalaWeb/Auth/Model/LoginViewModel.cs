﻿using System.ComponentModel.DataAnnotations;

namespace MarsalaWeb.Auth.Model
{
    public class LoginViewModel
    {
        [Required]
        [MinLength(4)]
        [MaxLength(15)]
        [Display(Name = "UserName")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }

	public class RegisterViewModel
	{
        [Required]
        [MinLength(4)]
        [MaxLength(15)]
        [Display(Name = "UserName")]
        public string UserName { get; set; }

        [Required]
		[EmailAddress]
		[Display(Name = "Email")]
		public string Email { get; set; }

		[Required]
		[DataType(DataType.Password)]
		[Display(Name = "Password")]
		public string Password { get; set; }

		[DataType(DataType.Password)]
		[Display(Name = "Confirm password")]
		[Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
		public string ConfirmPassword { get; set; }
	}


}