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

    this.quizzes = qs;
  }

  // creating a new property and initializing to empty array to display data to webpage
  // interpolated binding step 1
  quizzes: any[] = [];

}
