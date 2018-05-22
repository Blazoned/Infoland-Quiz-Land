using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QuizGames.Models;

namespace QuizGames.ViewModels
{
    public class LoginViewModel
    {       
        [Required]
        [Display(Name="Login")]
        public string Login { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Display(Name="Password")]
        public string Pass { get; set; }
        [Display(Name="AuthKey")]
        public string Key { get; set; }
    }
}
