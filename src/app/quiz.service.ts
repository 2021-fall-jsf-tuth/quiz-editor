import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  loadQuizzes = () => {
    // creating a new array literal
    const quizzesFromWeb = [
      // with an object
      {
        name: 'Quiz 1'
        // with another array literal holding...
        , questions: [
          // more objects!
          {
            name: 'Question 1'
          }
          , {
            name: 'Question 2'
          }
        ]
      }
      , {
        name: 'Quiz 2'
        , questions: [
          {
            name: 'Question 1'
          }
          , {
            name: 'Question 2'
          }
          , {
            name: 'Question 3'
          }
        ]
      }
    ];

    return quizzesFromWeb;
  };
}
