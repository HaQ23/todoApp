import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosArr: Todo[] = [];
  todoChanged = new Subject<Todo[]>();
  public get todos() {
    return this.todosArr.slice();
  }
  public set todos(storeTodosArr: Todo[]) {
    this.todosArr = [...storeTodosArr];
    this.todoChanged.next(this.todos);
  }
  addTodo(todo: Todo): void {
    this.todosArr.push(todo);
    this.todoChanged.next(this.todos);
  }
  deleteTodo(id: number): void {
    this.todosArr = this.todos.filter((todo) => todo.id !== id);
    this.todoChanged.next(this.todos);
  }
  changeTodoStatus(_todo: Todo) {
    const searchedTodo = this.todos.find((todo) => todo.id === _todo.id);
    if (searchedTodo) {
      searchedTodo.isCompleteted = _todo.isCompleteted;
      searchedTodo.isImportant = _todo.isImportant;
      searchedTodo.name = _todo.name;
      searchedTodo.completionData = _todo.completionData;
      searchedTodo.steps = _todo.steps;
      searchedTodo.plannedDate = _todo.plannedDate;
      searchedTodo.isTodayDay = _todo.isTodayDay;
    }
    this.todoChanged.next(this.todos);
  }
}
