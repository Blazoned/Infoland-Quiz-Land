using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuizGames.Models
{
    public class Question
    {
        //fields
        private string id;
        private string text;
        private string[] answers;
        private int expectedAnswer;

        public string Id
        {
            get { return id; }
            set { id = value; }
        }
        public string Text
        {
            get { return text; }
            set { text = value; }
        }
        public string[] Answers
        {
            get { return answers; }
            set { answers = value; }
        }
        public int ExpectedAnswer
        {
            get { return expectedAnswer; }
            set { expectedAnswer = value; }
        }

        //Methods
        public Boolean RetrieveQuestionData(string id)
        {
            return true;
        }

        public Boolean Answer(string answer)
        {
            return true;
        }
    }
}