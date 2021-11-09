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
    
    const newQuiz: QuizDisplay = {
      quizName: "Untitled Quiz"
        , quizQuestions: []
    }; 
    
    this.quizzes = [
      ...this.quizzes
      , newQuiz
        
    ];

    this.selectQuiz(newQuiz);
  };
}
