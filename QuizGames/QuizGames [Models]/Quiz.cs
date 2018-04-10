using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuizGames.Models
{
    public class Quiz
    {
        //fields
        private string id;
        private string title;
        private List<Question> questions;

        public string Id
        {
            get { return id; }
            set { id = value; }
        }

        public string Title
        {
            get { return title; }
            set { title = value; }
        }

        public List<Question> Questions
        {
            get { return questions; }
            set { questions = value; }
        }

        //methods
        public Boolean RetrieveQuizData(string id)
        {
            return true;
        }
    }
}