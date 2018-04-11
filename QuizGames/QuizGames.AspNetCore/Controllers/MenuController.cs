using Microsoft.AspNetCore.Mvc;
using QuizGames.ViewModels;


namespace QuizGames__Asp.Net_Core_.Controllers
{
    public class MenuController : Controller
    {
        [HttpGet]
        public ActionResult Menu()
        {
            return View();
        }

        //[HttpPost]
        //public IActionResult play()
        //{
        //    return RedirectToAction();
        //}

    }
}