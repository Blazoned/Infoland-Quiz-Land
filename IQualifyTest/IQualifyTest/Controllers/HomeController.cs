using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using IQualifyTest.Models;
using Microsoft.AspNetCore.Http;

namespace IQualifyTest.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            LoginModel model = new LoginModel();

            if (Request.Cookies.ContainsKey("AuthKey"))
            {
                model.Key = Request.Cookies["AuthKey"].ToString();

                CookieOptions options = new CookieOptions
                {
                    Expires = DateTime.Now.AddDays(-1),
                    HttpOnly = true,
                    Secure = true
                };
                Response.Cookies.Append("AuthKey", "", options);
            }

            return View(model);
        }

        [HttpPost]
        [Route("results")]
        public IActionResult Results(LoginModel id)
        {
            CookieOptions options = new CookieOptions
            {
                HttpOnly = true,
                Secure = true
            };
            Response.Cookies.Append("AuthKey", id.Key, options);

            return RedirectToAction("Index");
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
