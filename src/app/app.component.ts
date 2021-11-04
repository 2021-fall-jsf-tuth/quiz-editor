import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string 
  quizQuestions: questionDisplay[]
}

interface questionDisplay {
  questionName:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'quiz-editor';

  constructor (
    private quizSvc: QuizService  
  ) {}

  ngOnInit () {
    const qs = this.quizSvc.loadQuizzes();
    console.log(qs);
    
    this.quizzes = qs.map(x => ({
      quizName: x.name
      , quizQuestions: x.questions.map(y => ({
        questionName: y.name
      }))
    }));
  }
  quizzes: any[]= [];


}
