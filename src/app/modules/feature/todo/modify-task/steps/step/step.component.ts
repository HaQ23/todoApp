import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo, TodoStep } from 'src/app/modules/core/interfaces/todo.interface';
import { StepService } from 'src/app/modules/core/services/step.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent {
  @Input() step!: TodoStep;
  @Input() todo!: Todo;
  @ViewChild('textStep') textStep!: ElementRef;
  showDelay = new FormControl(1000);
  openModal = false;
  constructor(private stepService: StepService) {}
  deleteStep() {
    this.stepService.deleteTodoStep(this.step.id, this.todo);
  }
  changeNameStep() {
    this.stepService.changeStepStatus(
      {
        id: this.step.id,
        isCompleteted: this.step.isCompleteted,
        name: this.textStep.nativeElement.textContent,
      },
      this.todo
    );
  }
  changeStatusStep() {
    this.stepService.changeStepStatus(
      {
        id: this.step.id,
        isCompleteted: !this.step.isCompleteted,
        name: this.step.name,
      },
      this.todo
    );
  }
  closeModal() {
    this.openModal = false;
  }
  showDeleteTodoModal() {
    this.openModal = true;
  }
}
