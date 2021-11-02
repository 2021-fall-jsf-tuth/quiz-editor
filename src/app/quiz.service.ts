import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }


  loadQuizzes = () => {
    const quizzesFromWeb = [

      {name: 'Quiz 1',
        questions: [
          {name: 'Question 1', data: 'Data 1'},
          {name: 'Question 2', data: 'Data 2'},
          {name: 'Question 3', data: 'Data 3'}
        ]
      },

      {name: 'Quiz 2',
        questions: [
          {name: 'Question 1', data: 'Data 1.2'}
        ]
      }
    ];

    return quizzesFromWeb;
  };
}
