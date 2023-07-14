import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category, PrimeCategory, DifficultyLevel } from 'src/app/models/category';
import { QuestionList, Results } from 'src/app/models/questions';
import { QuizConstants } from 'src/app/quiz.constants';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  difficultyLevels: DifficultyLevel[] = QuizConstants.DIFFICULTI_LEVEL;
  amount: number = QuizConstants.AMOUNT;
  type: string = QuizConstants.TYPE;
  subscription: Subscription = new Subscription();
  categoryList: PrimeCategory<Category[]>;
  createQuizForm: FormGroup = new FormGroup({
    category: new FormControl('Select category'),
    difficultyLevel: new FormControl('')
  });
  questionList: QuestionList;
  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    //getting category list.
    this.subscription = this.quizService.getCategory().subscribe((res: PrimeCategory<Category[]>) => {
      this.categoryList = res;
    });

  }

  //getting question list.
  getQuestions(): void {
    let category: number = this.createQuizForm.get('category')?.value;
    let difficultyLevel: string = this.createQuizForm.get('difficultyLevel')?.value; 
    
    if (category > 0  && difficultyLevel !== '') {
      this.subscription = this.quizService.getQuestions(this.amount, category, difficultyLevel, this.type).subscribe((res: QuestionList) => {
        this.questionList = res;
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
