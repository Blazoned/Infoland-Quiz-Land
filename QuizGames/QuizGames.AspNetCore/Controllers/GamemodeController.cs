using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using QuizGames.ViewModels;
using System.Runtime.Serialization;

namespace QuizGames__Asp.Net_Core_.Controllers
{
    public class GamemodeController : Controller
    {
        [HttpGet]
        public IActionResult Camelrace(GameModeViewModel model)
        {
            // Get the authentication bearer token if the cookie contains the authentication code
            model.AuthKey = Request.Cookies.ContainsKey("AuthKey") ? Request.Cookies["AuthKey"] : String.Empty;
            
            model.filllist();

            string jsonmodel = Newtonsoft.Json.JsonConvert.SerializeObject(model);
            Console.WriteLine(model.ToString());
            return View(model);
        }

        [HttpPost]
        public IActionResult Giveanswer(GameModeViewModel model)
        {
            return RedirectToAction("Camelrace", "Gamemode", model);
        }
    }
}