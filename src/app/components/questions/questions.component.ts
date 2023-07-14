import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Results } from 'src/app/models/questions';
import { QuizService } from 'src/app/services/quiz.service';
import { decode } from 'html-entities';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent {
  @Input() results: Results[] = [];
  displaySubmitButton: boolean = false;
  constructor(private route: Router, private quizService: QuizService) { }
  ngOnInit(): void { } 
  ngOnChanges(): void {
    this.displaySubmitButton = false;
    for (let option of this.results) {
      option.question = decode(option.question);
      option.selectedAnswer = '';
      let selecteIndex = Math.floor(Math.random() * 4);
      option.incorrect_answers.splice(selecteIndex, 0, option.correct_answer);
      for (const [index, value] of option.incorrect_answers.entries()) {
        option.incorrect_answers[index] = decode(value);
      }
    }
  }
  
  selectOption(index: number, selectedAnswer: string, answerIndex: number): void { 
    if (this.results[index].indexAnswer !== answerIndex) {
      this.results[index].indexAnswer = answerIndex;
      this.results[index].selectedAnswer = selectedAnswer;
    } else {
      this.results[index].indexAnswer = -1;
      this.results[index].selectedAnswer = '';
    }
 
    let result = this.results.filter(ele => ele.selectedAnswer && ele.selectedAnswer !== '');
    if (result.length === 5) {
      this.displaySubmitButton = true;
    } else {
      this.displaySubmitButton = false;
    }
  }
 
  submit(): void {
    this.quizService.saveAnswers(this.results);
    this.route.navigate(['/', 'result']);
  }

}
