import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Results } from 'src/app/models/questions';
import { QuizConstants } from 'src/app/quiz.constants';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  subscription: Subscription = new Subscription();
  showResults: Results[];
  answerCount: number = 0;
  totalQuestionsCount: number = QuizConstants.AMOUNT;
  color: string = '';
  constructor(private quizService: QuizService, private route: Router) { }

  ngOnInit(): void {
    this.subscription = this.quizService.quizResultSubscribe$.subscribe((data: Results[]) => {
      this.showResults = data;
    });

    for (let obj of this.showResults) {
      if (obj.correct_answer === obj.selectedAnswer) {
        this.answerCount++;
      }
    } 
    
    //show color based on the correct answer
    if (this.answerCount >= QuizConstants.MARK_RANGE[0] && this.answerCount <= QuizConstants.MARK_RANGE[1]) {
      this.color = QuizConstants.RED_COLOR;
    } else if (this.answerCount >= QuizConstants.MARK_RANGE[2] && this.answerCount <= QuizConstants.MARK_RANGE[3]) {
      this.color = QuizConstants.YELLOW_COLOR
    } else if (this.answerCount >= QuizConstants.MARK_RANGE[4] && this.answerCount <= QuizConstants.MARK_RANGE[5]) {
      this.color = QuizConstants.GREEN_COLOR;
    }
  } 

  navigateToCreate(): void {
    this.route.navigate(['/', 'home'])
  }
 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
