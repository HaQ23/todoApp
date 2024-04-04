import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/modules/core/interfaces/todo.interface';
import { TodoApiService } from 'src/app/modules/core/services/todo-api.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo!: Todo;
  @Input() i!: number;
  @Input() id!: number;

  showDelay = new FormControl(1000);
  constructor(private todoApiService: TodoApiService) {}
  get completedStepsCount(): number {
    return this.todo.steps.filter((step) => step.isCompleteted === true).length;
  }

  changeImportanceTodo(event: Event): void {
    event.stopPropagation();
    this.todoApiService
      .patchTodo(this.todo.id, {
        isCompleteted: this.todo.isCompleteted,
        name: this.todo.name,
        creationDate: this.todo.creationDate,
        completionData: this.todo.completionData,
        isImportant: !this.todo.isImportant,
        steps: this.todo.steps,
        plannedDate: this.todo.plannedDate,
        isTodayDay: this.todo.isTodayDay,
        user_id: this.todo.user_id,
      })
      .subscribe(() => {});
  }
  changeTodoStatus(event: Event): void {
    event.stopPropagation();
    let currentDate: Date | null;
    if (!this.todo.isCompleteted) {
      currentDate = new Date();
    } else {
      currentDate = null;
    }
    this.todoApiService
      .patchTodo(this.todo.id, {
        isCompleteted: !this.todo.isCompleteted,
        name: this.todo.name,
        creationDate: this.todo.creationDate,
        completionData: currentDate,
        isImportant: this.todo.isImportant,
        steps: this.todo.steps,
        plannedDate: this.todo.plannedDate,
        isTodayDay: this.todo.isTodayDay,
        user_id: this.todo.user_id,
      })
      .subscribe((response) => {
        console.log('wysłano');
      });
  }
}
