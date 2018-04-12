using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizGames.Models;

namespace QuizGames.AspNetCore.ViewModels
{
    public class GameModeViewModel
    {
        public List<Question> questions = new List<Question>();
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
            genDummieData();
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
        
        public List<Question> genDummieData()
        {
            Awnser a1 = new Awnser("Duitsland", true);
            Awnser a2 = new Awnser("Nederland", false);
            Awnser a3 = new Awnser("China", false);
            Awnser a4 = new Awnser("Brazilë", false);
            List<Awnser> aa = new List<Awnser>
            {
                a1,
                a2,
                a3,
                a4
            };
            Question q1 = new Question("welk land is heeft het vorige WK gewonnen?", aa, "Duitsland");
            questions.Add(q1);


            Awnser b1 = new Awnser("De Verenigde Staten van Amerika", true);
            Awnser b2 = new Awnser("Nederland", false);
            Awnser b3 = new Awnser("China", false);
            Awnser b4 = new Awnser("Brazilë", false);
            List<Awnser> b = new List<Awnser>
            {
                b1,
                b2,
                b3,
                b4
            };
            Question q2 = new Question("Van Welk Land is Trump President?", aa, "De Verenigde Staten van Amerika");
            questions.Add(q2);

            return questions;
        }
        #endregion



    }
}