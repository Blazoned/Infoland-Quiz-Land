using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace QuizGames__Asp.Net_Core_.Controllers
{
    public class LobbyController : Controller
    {
        public IActionResult Lobby()
        {
            return View();
        }
    }
}