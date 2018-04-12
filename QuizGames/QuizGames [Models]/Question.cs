using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuizGames.Models
{
   public class Question
    {
        public string question;
        public string correctAnswer;
        public List<Awnser> awnsers;

        public Question(string question, List<Awnser> awnsers, string correctAnswer)
        {
            this.question = question;
            this.awnsers = awnsers;
            this.correctAnswer = correctAnswer;
        }

        public Question(string question, string awnser1, Boolean correct1, string awnser2, Boolean correct2, string awnser3, Boolean correct3, string awnser4, Boolean correct4)
        {
            List<Awnser> aa = new List<Awnser>();

            Awnser a1 = new Awnser(awnser1, correct1);
            aa.Add(a1);
            Awnser a2 = new Awnser(awnser2, correct2);
            aa.Add(a2);
            Awnser a3 = new Awnser(awnser3, correct3);
            aa.Add(a3);
            Awnser a4 = new Awnser(awnser4, correct4);
            aa.Add(a4);

            this.awnsers = aa;
            this.question = question;
        }
    }
}
