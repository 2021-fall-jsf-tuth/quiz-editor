import { Component, OnInit } from '@angular/core';
import { QuizService, ShapeForSavingEditedQuizzes, ShapeForSavingNewQuizzes } from './quiz.service';

import {
  trigger
  , transition
  , style
  , animate
  , keyframes
} from '@angular/animations';

interface QuizDisplay {
  quizName: string;
  quizQuestions: QuestionDisplay[]
  markedForDelete: boolean;
  newlyAdded: boolean;
  naiveChecksum: string;
}

interface QuestionDisplay {
  questionName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailsFromLeft', [
      transition('leftPosition => finalPosition', [
        animate('300ms', keyframes([
          style({ left: '-30px', offset: 0.0 }),
          style({ left: '-20px', offset: 0.25 }),
          style({ left: '-10px', offset: 0.5 }),
          style({ left: '-5px', offset: 0.75 }),
          style({ left: '0px', offset: 1.0 })
        ]))
      ]),
    ]),
    trigger('pulseSaveCancelButtons', [
      transition('nothingToSave => somethingToSave', [
        animate('400ms', keyframes([
          style({ transform: 'scale(1.0)', 'transform-origin': 'top left', offset: 0.0 }),
          style({ transform: 'scale(1.2)', 'transform-origin': 'top left', offset: 0.5 }),
          style({ transform: 'scale(1.0)', 'transform-origin': 'top left', offset: 1.0 })
        ]))
      ])
    ])
  ]  
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
        , naiveChecksum: x.name + x.questions.map(z => '~' + z.name).join('')
      }));

      console.log(this.quizzes);
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
    this.detailsFromLeftState = "finalPosition";
  };

  addNewQuiz = () => {

    const newQuiz: QuizDisplay = {
      quizName: 'Untitled Quiz'
      , quizQuestions: []
      , markedForDelete: false
      , newlyAdded: true
      , naiveChecksum: ""
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
  }

  getAddedQuizzes = () => {
    return this.quizzes.filter(x => x.newlyAdded && !x.markedForDelete);
  };

  get addedQuizCount() {
    return this.getAddedQuizzes().length;
  }  

  getEditedQuizzes = () => {
    return this.quizzes.filter(x =>
      (x.quizName + x.quizQuestions.map(y => '~' + y.questionName).join('')) != x.naiveChecksum
      && !x.newlyAdded
      && !x.markedForDelete
    );
  };

  get editedQuizCount() {
    return this.getEditedQuizzes().length;
  }    

  detailsFromLeftState = "leftPosition";

  detailsFromLeftDone = () => {
    this.detailsFromLeftState = "leftPosition";
  };

saveQuizzes = async () => {
  try {
    // get and transform the edited and newly add quizzes 
    const editedQuizzes: ShapeForSavingEditedQuizzes[] = this.getEditedQuizzes().map(x => ({
      quiz: x.quizName
      , questions: x.quizQuestions.map(y => ({
        question: y.questionName
      }))
    })); 
    const newQuizzes: ShapeForSavingNewQuizzes[] = []; 

    // call the service to save them 
    const numberOfEditedQuizzesSaved = await this.quizSvc.saveQuizzes(
      editedQuizzes, 
      newQuizzes
    ); 
    console.log(numberOfEditedQuizzesSaved); 
  }

  catch (err) {
    console.error(err); 
  }
};


}
