using Microsoft.AspNetCore.Mvc;
using QuizGames.ViewModels;

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
        public IActionResult Index(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                model.Authorise();
            }

            return View(model);
        }

        
    }


}