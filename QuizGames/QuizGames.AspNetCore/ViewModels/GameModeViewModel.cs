using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuizGames.AspNetCore.ViewModels
{
    public class GameModeViewModel
    {
        #region Properties

        //all properties that are needed for the view and model to comunicate
        public string Question = " is sebas de speknek?";
        public string Anwser1 = "ja";
        public string Anwser2 = "nee";
        public string Anwser3 = "weet ik veel";
        public string Anwser4 = "ik ben bart en stem VVD dus ik laat me niet uit over deze stelling aangezien ik altijd PC ben";
        public string ChosenAnwser { get; set; }

        #endregion

        #region Methods

        public void SetChosenAnwser(string anwser)
        {
            ChosenAnwser = anwser;
        }

        #endregion

    }
}