using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizGames.ViewModels;
using System;

namespace QuizGames__Asp.Net_Core_.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Route("Authorise")]
        public IActionResult VerifyLogin(LoginViewModel model)
        {
            if (String.IsNullOrEmpty(model.Key))
                return RedirectToAction("Index");

            CookieOptions options = new CookieOptions
            {
                SameSite = SameSiteMode.Strict,
                HttpOnly = true,
                Secure = true,
                Domain = "",
                Expires = null
            };

            Response.Cookies.Append("AuthKey", model.Key);

            return RedirectToAction("Menu", "Menu");
        }
    }
}