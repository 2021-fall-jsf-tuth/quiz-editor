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
  ) { }

  ngOnInit() {
    const qs = this.quizSvc.loadQuizes();
    console.log(qs)
  }
}
