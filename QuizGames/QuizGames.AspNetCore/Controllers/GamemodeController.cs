using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using QuizGames.AspNetCore.ViewModels;

namespace QuizGames__Asp.Net_Core_.Controllers
{
    public class GamemodeController : Controller
    {
        [HttpGet]
        public IActionResult Camelrace(GameModeViewModel model)
        {
            model.filllist();
            
            return View(model);
        }

        
        

        [HttpPost]
        
        public IActionResult Giveanswer(GameModeViewModel model)
        {
            return RedirectToAction("Camelrace", "Gamemode", model);
        }
    }
}