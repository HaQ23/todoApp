import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from './todo.service';
import { environment } from 'src/environments/environment.development';
import { Observable, Subscription, filter, map, tap } from 'rxjs';
import { Todo } from '../interfaces/todo.interface';
import { AuthService } from './auth.service';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class TodoApiService implements OnInit, OnDestroy {
  apiUrl = environment.apiUrl;
  user: User | null = null;
  sub!: Subscription;
  constructor(
    private http: HttpClient,
    private todoService: TodoService,
    private authService: AuthService
  ) {
    this.sub = this.authService.user.subscribe((user) => {
      this.user = user;
      this.getTodos().subscribe((todos) => {
        this.todoService.todos = todos;
      });
    });
  }
  ngOnInit(): void {
    this.sub = this.authService.user.subscribe({
      next: (val) => (this.user = val),
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/todo`).pipe(
      map((todos) =>
        todos.filter(
          (todo) => todo.user_id === this.user?.idUser && this.user !== null
        )
      ),
      tap((todos) => {
        this.todoService.todos = todos;
      })
    );
  }

  postTodo(todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http
      .post<Todo>(`${this.apiUrl}/todo`, todo)
      .pipe(tap((todo) => this.todoService.addTodo(todo)));
  }
  deleteTodo(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/todo/${id}`).pipe(
      tap((response) => {
        this.todoService.deleteTodo(id);
      })
    );
  }
  patchTodo(id: number, todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/todo/${id}`, todo).pipe(
      tap((todo) => {
        this.todoService.changeTodoStatus(todo);
      })
    );
  }
}
