using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace QuizGames.Models
{
   public class Question
    {
        
        public string question;
        public string correctAnswer;
        public List<answer> awnsers;

        public Question(string question, List<answer> awnsers, string correctAnswer)
        {
            this.question = question;
            this.awnsers = awnsers;
            this.correctAnswer = correctAnswer;
        }

        public Question(string question, string awnser1, Boolean correct1, string awnser2, Boolean correct2, string awnser3, Boolean correct3, string awnser4, Boolean correct4)
        {
            List<answer> aa = new List<answer>();

            answer a1 = new answer(awnser1, correct1);
            aa.Add(a1);
            answer a2 = new answer(awnser2, correct2);
            aa.Add(a2);
            answer a3 = new answer(awnser3, correct3);
            aa.Add(a3);
            answer a4 = new answer(awnser4, correct4);
            aa.Add(a4);

            this.awnsers = aa;
            this.question = question;
        }
    }
}
