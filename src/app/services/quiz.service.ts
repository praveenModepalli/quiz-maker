import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, PrimeCategory } from '../models/category';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuestionList, Results } from '../models/questions';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  baseURL: string = 'https://opentdb.com/';
  private quizResult = new BehaviorSubject<Results[]>([] as Results[]);
  public quizResultSubscribe$ = this.quizResult.asObservable();
  constructor(private http: HttpClient) { }

  //getting the category list from API
  getCategory(): Observable<PrimeCategory<Category[]>> {
    const url: string = `${this.baseURL}api_category.php`;
    return this.http.get<PrimeCategory<Category[]>>(url);
  }

  //getting questions from API
  getQuestions(amount: number, category: number, difficulty: string, type: string): Observable<QuestionList> {
    const url: string = `${this.baseURL}api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    return this.http.get<QuestionList>(url);
  }

  //save answers on click of submitting the quiz
  saveAnswers(data: Results[]): void {
    this.quizResult.next(data);
  }
}
