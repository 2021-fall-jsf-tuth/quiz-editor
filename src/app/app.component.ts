import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[]
}

// interfaces can utilize other interfaces
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
    // TS parameter property...
    private quizSvc: QuizService
  ) {}

  // A life cycle event
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
}
