import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TodoApiService } from 'src/app/modules/core/services/todo-api.service';
import { TodoService } from 'src/app/modules/core/services/todo.service';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/modules/core/interfaces/todo.interface';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy, OnChanges {
  @Output() selectedTask = new EventEmitter<Todo>();
  @Input() category!: string;
  showDoneTodos = false;
  todos: Todo[] = this.todoService.todos;
  doneTodos: Todo[] = this.todoService.todos.filter(
    (todo) => todo.isCompleteted
  );
  notDoneTodos: Todo[] = this.todoService.todos.filter(
    (todo) => !todo.isCompleteted
  );
  sub!: Subscription;
  errorMessage = '';
  constructor(
    private todoService: TodoService,
    private todoApiService: TodoApiService
  ) {}
  ngOnInit(): void {
    this.sub = this.todoService.todoChanged.subscribe({
      next: (arrTodos) => {
        switch (this.category) {
          case 'important':
            this.todos = arrTodos.filter((todo) => todo.isImportant);
            break;
          case 'myDay':
            this.todos = arrTodos.filter((todo) => todo.isTodayDay);
            break;
          case 'planned':
            this.todos = arrTodos.filter((todo) => todo.plannedDate !== null);
            break;
          default:
            this.todos = arrTodos;
            break;
        }
        this.doneTodos = this.todos.filter((todo) => todo.isCompleteted);
        this.notDoneTodos = this.todos.filter((todo) => !todo.isCompleteted);
      },
    });
    if (this.todos.length === 0) {
      this.todoApiService.getTodos().subscribe({
        error: (err) => {
          this.errorMessage = 'Wystąpił błąd. Spróbuj ponownie.';
        },
      });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['category'].isFirstChange() && changes['category']) {
      switch (this.category) {
        case 'important':
          this.todos = this.todoService.todos.filter(
            (todo) => todo.isImportant
          );
          break;
        case 'myDay':
          this.todos = this.todoService.todos.filter((todo) => todo.isTodayDay);
          break;
        case 'planned':
          this.todos = this.todoService.todos.filter(
            (todo) => todo.plannedDate !== null
          );
          break;
        default:
          this.todos = this.todoService.todos;
          break;
      }
      this.doneTodos = this.todos.filter((todo) => todo.isCompleteted);
      this.notDoneTodos = this.todos.filter((todo) => !todo.isCompleteted);
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  onTaskClick(todo: Todo) {
    this.selectedTask.emit(todo);
  }
  showDoneTodo() {
    this.showDoneTodos = !this.showDoneTodos;
  }
}
