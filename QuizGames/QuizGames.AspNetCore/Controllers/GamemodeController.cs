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
        public IActionResult Camelrace(GameModeViewModel model)
        {
            return View(model);
        }
    }
}