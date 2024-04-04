import { Component, ViewChild, Input, OnInit, OnDestroy } from '@angular/core';
import { TodoApiService } from 'src/app/modules/core/services/todo-api.service';
import { TodoService } from 'src/app/modules/core/services/todo.service';
import { NgModel } from '@angular/forms';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { User } from 'src/app/modules/core/interfaces/user';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit, OnDestroy {
  @ViewChild('taskInput') taskInput!: NgModel;
  @Input() category!: string;
  user: User | null = null;
  sub!: Subscription;
  taskName = '';
  constructor(
    private todoApiService: TodoApiService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.sub = this.authService.user.subscribe({
      next: (value) => (this.user = value),
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  addNewTodo(): void {
    if (this.taskInput.valid && this.user) {
      switch (this.category) {
        case 'important':
          this.todoApiService
            .postTodo({
              name: this.taskName,
              isCompleteted: false,
              creationDate: new Date(),
              completionData: null,
              isImportant: true,
              steps: [],
              plannedDate: null,
              isTodayDay: false,
              user_id: this.user.idUser,
            })
            .subscribe({
              error: (err) => {
                console.log('blad');
              },
            });
          break;
        case 'myDay':
          this.todoApiService
            .postTodo({
              name: this.taskName,
              isCompleteted: false,
              creationDate: new Date(),
              completionData: null,
              isImportant: false,
              steps: [],
              plannedDate: null,
              isTodayDay: true,
              user_id: this.user.idUser,
            })
            .subscribe({
              error: (err) => {
                console.log('blad');
              },
            });
          break;
        case 'planned':
          this.todoApiService
            .postTodo({
              name: this.taskName,
              isCompleteted: false,
              creationDate: new Date(),
              completionData: null,
              isImportant: false,
              steps: [],
              plannedDate: new Date(),
              isTodayDay: false,
              user_id: this.user.idUser,
            })
            .subscribe({
              error: (err) => {
                console.log('blad');
              },
            });
          break;
        default:
          this.todoApiService
            .postTodo({
              name: this.taskName,
              isCompleteted: false,
              creationDate: new Date(),
              completionData: null,
              isImportant: false,
              steps: [],
              plannedDate: null,
              isTodayDay: false,
              user_id: this.user.idUser,
            })
            .subscribe({
              error: (err) => {
                console.log('blad');
              },
            });
          break;
      }

      this.taskName = '';
    } else if (!this.user) {
      this._snackBar.open(
        'Musisz byc zalogowany aby dodac nowe zadanie',
        'OK',
        {
          duration: 3000,
        }
      );
    }
  }
}
