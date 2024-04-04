import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo, TodoStep } from 'src/app/modules/core/interfaces/todo.interface';

import { StepService } from 'src/app/modules/core/services/step.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit, OnChanges {
  @Input() todo!: Todo;
  steps: TodoStep[] = this.stepService.todoSteps;
  constructor(private stepService: StepService) {}
  ngOnInit(): void {
    this.stepService.todoSteps = this.todo.steps;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['todo'].isFirstChange() && changes['todo']) {
      this.stepService.todoSteps = this.todo.steps;
    }
  }
}
