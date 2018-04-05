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
        public string Rightanswer = "ik ben bart en stem VVD dus ik laat me niet uit over deze stelling aangezien ik altijd PC ben";
        public string ChosenAnwser { get; set; }

        public List<string> Answers = new List<string>();
        public List<string> RandomAnswers = new List<string>();

        #endregion

        #region Methods

        public void filllist()
        {
            Answers.Add(Anwser1);
            Answers.Add(Anwser2);
            Answers.Add(Anwser3);
            Answers.Add(Rightanswer);
        }

        public void RandomList()
        {
            while(Answers.Count > 0)
            {
                Random bsd = new Random();

                int fIndex = bsd.Next(0, Answers.Count);
                RandomAnswers.Add(Answers[fIndex]);
                Answers.RemoveAt(fIndex);
            }
        }

        #endregion

    }
}