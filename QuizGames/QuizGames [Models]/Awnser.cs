using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuizGames.Models
{
    public class Awnser
    {
        public string text;
        public Boolean correct;

        public Awnser(string text, Boolean correct)
        {
            this.text = text;
            this.correct = correct;
        }
    }
}
