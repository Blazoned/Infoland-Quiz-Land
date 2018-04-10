using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuizGames.Models
{
    public class Category
    {
        //fields
        private string id;
        private string title;
        private string text;
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
        public string Text
        {
            get { return text; }
            set { text = value; }
        }
        public  List<Question> Questions
        {
            get { return questions; }
            set { questions = value; }
        }

        //methods
        public Boolean RetrieveCategoryData(string id)
        {
            return true;
        }

        public void EmulateCategory()
        {

        }
    }
}