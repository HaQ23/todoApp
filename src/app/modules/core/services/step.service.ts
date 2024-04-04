import { Injectable } from '@angular/core';
import { Todo, TodoStep } from '../interfaces/todo.interface';
import { Subject } from 'rxjs';
import { TodoApiService } from './todo-api.service';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  private todoStepsArr: TodoStep[] = [];
  stepChanged = new Subject<TodoStep[]>();
  constructor(private todoApiService: TodoApiService) {}
  public get todoSteps() {
    return this.todoStepsArr.slice();
  }
  public set todoSteps(storeTodoSteps: TodoStep[]) {
    this.todoStepsArr = [
      ...storeTodoSteps.map((step, index) => {
        return { ...step, id: index + 1 };
      }),
    ];
    this.stepChanged.next(this.todoSteps);
  }
  addTodoStep(todo: Todo, name: string): void {
    let currentId = 0;
    if (this.todoStepsArr.length > 0) {
      currentId = this.todoStepsArr[this.todoStepsArr.length - 1].id;
    }
    this.todoStepsArr.push({
      id: currentId + 1,
      name: name,
      isCompleteted: false,
    });

    this.stepChanged.next(this.todoSteps);
    this.todoApiService
      .patchTodo(todo.id, {
        isCompleteted: todo.isCompleteted,
        name: todo.name,
        creationDate: todo.creationDate,
        completionData: todo.completionData,
        isImportant: todo.isImportant,
        steps: this.todoSteps,
        plannedDate: todo.plannedDate,
        isTodayDay: todo.isTodayDay,
        user_id: todo.user_id,
      })
      .subscribe();
  }
  deleteTodoStep(id: number, todo: Todo) {
    this.todoStepsArr = this.todoSteps.filter((step) => step.id !== id);
    this.stepChanged.next(this.todoSteps);
    this.todoApiService
      .patchTodo(todo.id, {
        isCompleteted: todo.isCompleteted,
        name: todo.name,
        creationDate: todo.creationDate,
        completionData: todo.completionData,
        isImportant: todo.isImportant,
        steps: this.todoSteps,
        plannedDate: todo.plannedDate,
        isTodayDay: todo.isTodayDay,
        user_id: todo.user_id,
      })
      .subscribe();
  }
  changeStepStatus(step: TodoStep, todo: Todo) {
    const searchedStep = this.todoSteps.find(
      (stepStore) => stepStore.id === step.id
    );

    if (searchedStep) {
      searchedStep.id = step.id;
      searchedStep.isCompleteted = step.isCompleteted;
      searchedStep.name = step.name;
    }
    this.todoApiService
      .patchTodo(todo.id, {
        isCompleteted: todo.isCompleteted,
        name: todo.name,
        creationDate: todo.creationDate,
        completionData: todo.completionData,
        isImportant: todo.isImportant,
        steps: this.todoSteps,
        plannedDate: todo.plannedDate,
        isTodayDay: todo.isTodayDay,
        user_id: todo.user_id,
      })
      .subscribe();
  }
}
