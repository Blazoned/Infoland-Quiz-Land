using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace QuizGames.Models
{
    public class answer
    {
        [DataMember(Name = "question")]
        public string Text { get; set; }
        [DataMember(Name = "correct")]
        public Boolean Correct { get; set; }

        public answer(string text, Boolean correct)
        {
            Text = text;
            Correct = correct;
        }
    }
}
