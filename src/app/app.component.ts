import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quiz-editor';

  constructor(
    private quizSvc: QuizService
  ) {
    // to use dependency injection to use the service we just created
    
  }

  ngOnInit() {
    const qs = this.quizSvc.loadQuizzes();
    console.log(qs);
  }

}
