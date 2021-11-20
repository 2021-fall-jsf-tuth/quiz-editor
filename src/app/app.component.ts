import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[]
  markedForDelete: boolean;
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

  errorLoadingQuizzes = false;
  //loading = true;
  onLoading = true; 

  ngOnInit() {
    const qs = this.quizSvc.loadQuizzes();
    console.log(qs);  

    //this.loading = true;
    this.onLoading = true; 

    qs.subscribe(
      data => {
        console.log(data);

        this.quizzes = data.map(x => ({
          quizName: x.name
          , quizQuestions: x.questions.map(y => ({
            questionName: y.name
          }))
          , markedForDelete: false
        }));

        //this.loading = true;
        this.onLoading = true; 
      }
      , err => {
        console.error(err);
        this.errorLoadingQuizzes = false;
        //this.loading = true;
        this.onLoading = true; 
      }
    );
    
    // this.quizzes = qs.map(x => ({
    //   quizName: x.name
    //   , quizQuestions: x.questions.map(y => ({
    //     questionName: y.name
    //   }))
    //   , markedForDelete: false
    // }));
  }

  quizzes: QuizDisplay[] = [];

  selectedQuiz: QuizDisplay | undefined = undefined;

  selectQuiz = (quizToSelect: QuizDisplay) => {
    console.log(quizToSelect);
    this.selectedQuiz = quizToSelect;
  };

  addNewQuiz = () => {

    const newQuiz: QuizDisplay = {
      quizName: 'Untitled Quiz'
      , quizQuestions: []
      , markedForDelete: false
    };

    this.quizzes = [
      ...this.quizzes
      , newQuiz
    ];

    this.selectQuiz(newQuiz);
  };

  addNewQuestion = () => {

    if (this.selectedQuiz) {
      this.selectedQuiz.quizQuestions = [
        ...this.selectedQuiz.quizQuestions
        , {
          questionName: "Untitled Question"
        }
      ];
    }
  };

  removeQuestion = (questionToRemove: QuestionDisplay) => {
    if (this.selectedQuiz) {
      this.selectedQuiz.quizQuestions = 
        this.selectedQuiz.quizQuestions.filter(
          x => x !== questionToRemove
        );
    }
  };

  unselectQuiz = () => {
    this.selectedQuiz = undefined;
  };
}
