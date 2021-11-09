import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[]
}

interface QuestionDisplay {
  questionName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  constructor(
    private quizSvc: QuizService
  ) {}

  ngOnInit() {
    const qs = this.quizSvc.loadQuizzes();
    console.log(qs);  
    
    this.quizzes = qs.map(x => ({
      quizName: x.name
      , quizQuestions: x.questions.map(y => ({
        questionName: y.name
      }))
    }));
  }

  quizzes: QuizDisplay[] = [];

  selectedQuiz: QuizDisplay | undefined = undefined;

  selectQuiz = (quizToSelect: QuizDisplay) => {
    console.log(quizToSelect);
    this.selectedQuiz = quizToSelect;
  };

  addNewQuiz = () => {
    // reassign our list of quizzes to a new object array literal
    this.quizzes = [
      // spread in all previous quizzes from line 37, and the current quiz that will be added
      ...this.quizzes
      , 
      // add an object for the new quiz
      {
        quizName: "Untitled Quiz"
        , quizQuestions: []
      }
    ];
  };
}
