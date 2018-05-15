using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuizGames.Models;

namespace QuizGames.ViewModels
{
    public class GameModeViewModel
    {
        public List<Question> questions = new List<Question>();
        #region Properties

        //all properties that are needed for the view and model to comunicate
        public string AuthKey { get; set; }

        public void filllist()
        {
            genDummieData();   
        }
        public List<Question> genDummieData()
        {
            answer a1 = new answer("Duitsland", true);
            answer a2 = new answer("Nederland", false);
            answer a3 = new answer("China", false);
            answer a4 = new answer("Brazilë", false);
            List<answer> aa = new List<answer>
            {
                a1,
                a2,
                a3,
                a4
            };
            Question q1 = new Question("welk land is heeft het vorige WK gewonnen?", aa, "Duitsland");
            questions.Add(q1);


            answer b1 = new answer("USA", true);
            answer b2 = new answer("Nederland", false);
            answer b3 = new answer("China", false);
            answer b4 = new answer("Brazilë", false);
            List<answer> b = new List<answer>
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