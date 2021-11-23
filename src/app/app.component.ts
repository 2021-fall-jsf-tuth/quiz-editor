import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[]
  markedForDelete: boolean;
  newlyAdded: boolean; 
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
  loading = true;

  load = async () => {
    try {
      this.loading = true;

      const qs = await this.quizSvc.loadQuizzes();

      this.quizzes = qs.map(x => ({
        quizName: x.name
        , quizQuestions: x.questions.map(y => ({
          questionName: y.name
        }))
        , markedForDelete: false
        , newlyAdded: false
      }));

      this.loading = false;
    }
    catch (err) {
      console.error(err);
      this.loading = false;
      this.errorLoadingQuizzes = true;
    }
  };

  ngOnInit() {
    this.load();
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
      , newlyAdded: true
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

  jsPromisesOne = () => {
    const x = this.quizSvc.getMagicNumber(true);
    console.log(x); // ? ? ? 

    x
      .then(
        data => {
          console.log(data); // ? ? ?

          const secondMagicNumber = this.quizSvc.getMagicNumber(true);
          console.log(secondMagicNumber); // ? ? ?

          secondMagicNumber
            .then(
              data => {
                console.log(data);
              }
            )
            .catch(
            err => {
              console.error(err);
            }
          );
      }
      )
      .catch(
        err => {
          console.error(err);
        }
      )
    ;
  };

  jsPromisesTwo = async () => {

    try {
      const x = await this.quizSvc.getMagicNumber(true);
      console.log(x); // ? ? ?

      const secondMagicNumber = await this.quizSvc.getMagicNumber(true);
      console.log(secondMagicNumber);

      // Get 10 magic numbers...
      for (let x = 0; x < 10; x++) {
        console.log(await this.quizSvc.getMagicNumber(true));
      }
  
    }
    catch (err) {
      console.error(err);
    }

  };

  jsPromisesThree = async () => {

    try {
      const x = this.quizSvc.getMagicNumber(true);
      console.log(x); // ? ? ?

      const secondMagicNumber = this.quizSvc.getMagicNumber(true);
      console.log(secondMagicNumber);

      const results = await Promise.all([x, secondMagicNumber]);
      // const results = await Promise.race([x, secondMagicNumber]);
      // const results = await Promise.allSettled([x, secondMagicNumber]);
      console.log(results);
  
    }
    catch (err) {
      console.error(err);
    }

  };


  cancelAllChanges = () => {
    this.load(); 
    this.selectedQuiz = undefined; 
  }; 

  getDeletedQuizzes = () => {
    return this.quizzes.filter(x => x.markedForDelete); 
  }; 

  get deletedQuizCount() {
    return this.getDeletedQuizzes().length; 
  };

  getAddedQuizzes = () => {
    return this.quizzes.filter(x => x.newlyAdded); 
  }; 

  get addedQuizCount() {
    return this.getAddedQuizzes().length; 
  };


}
