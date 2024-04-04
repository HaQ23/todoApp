import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { Todo } from 'src/app/modules/core/interfaces/todo.interface';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { TodoApiService } from 'src/app/modules/core/services/todo-api.service';
import { StepService } from 'src/app/modules/core/services/step.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-modify-task',
  templateUrl: './modify-task.component.html',
  styleUrls: ['./modify-task.component.scss'],
  animations: [
    trigger('slideFromRight', [
      state('void', style({ transform: 'translateX(100%)' })),
      state('*', style({ transform: 'translateX(0)' })),
      transition(':enter', [animate('200ms ease-out')]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class ModifyTaskComponent implements AfterViewInit, OnChanges {
  @Input() todo!: Todo;
  @Input() isSelectedTodo!: boolean;
  @Output() closeBtnCliked = new EventEmitter<boolean>();
  @ViewChild('hamBtn') hamBtn!: ElementRef;
  @ViewChild('textArea') textArea!: ElementRef;
  @ViewChild('addNewStepEl') addNewStepEl!: ElementRef;
  @ViewChild('dateInput') dateInput!: ElementRef;
  selectedDate: Date | null = null;
  createdDate!: Date;
  showDelay = new FormControl(1000);
  openModal = false;

  constructor(
    private todoApiService: TodoApiService,
    private stepService: StepService
  ) {}

  changeDate() {
    if (this.todo.completionData === null) {
      this.createdDate = new Date(this.todo.creationDate);
    } else {
      this.createdDate = new Date(this.todo.completionData);
    }
  }
  setCurrentDate(): Date {
    if (this.todo.completionData === null) {
      return new Date(this.todo.creationDate);
    } else {
      return new Date(this.todo.completionData);
    }
  }

  get displayedDate(): Date {
    return this.setCurrentDate();
  }

  ngAfterViewInit(): void {
    this.textArea.nativeElement.textContent = this.todo.name;
    setTimeout(() => {
      this.changeDate();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['todo'].isFirstChange() && changes['todo']) {
      this.textArea.nativeElement.textContent = this.todo.name;
      const previousTodo: Todo = changes['todo'].previousValue;
      const currentTodo: Todo = changes['todo'].currentValue;
      if (previousTodo.isCompleteted !== currentTodo.isCompleteted) {
        this.changeDate();
      }
      if (previousTodo.id !== currentTodo.id) {
        this.stepService.todoSteps = this.todo.steps;
      }
    }
  }
  onClose() {
    this.closeBtnCliked.emit(true);
  }
  deleteTodo(): void {
    this.todoApiService.deleteTodo(this.todo.id).subscribe({
      complete: () => {
        this.closeBtnCliked.emit(true);
        this.openModal = false;
      },
      error: (err) => {
        console.log('Wystąpił błąd. Spróbuj ponownie.');
      },
    });
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
      .subscribe(() => {
        this.changeDate();
      });
  }
  changeTodoName(): void {
    if (this.textArea.nativeElement.textContent) {
      this.todoApiService
        .patchTodo(this.todo.id, {
          isCompleteted: this.todo.isCompleteted,
          name: this.textArea.nativeElement.textContent,
          creationDate: this.todo.creationDate,
          completionData: this.todo.completionData,
          isImportant: this.todo.isImportant,
          steps: this.todo.steps,
          plannedDate: this.todo.plannedDate,
          isTodayDay: this.todo.isTodayDay,
          user_id: this.todo.user_id,
        })
        .subscribe();
    }
  }
  focusOnSpan(): void {
    this.addNewStepEl.nativeElement.focus();
    if (this.addNewStepEl.nativeElement.textContent === 'Kolejny krok') {
      this.addNewStepEl.nativeElement.textContent = '\u00A0';
      this.addNewStepEl.nativeElement.style.color = '#000000';
      this.addNewStepEl.nativeElement.style.fontWeight = 'normal';
    } else {
      this.addNewStepEl.nativeElement.style.color = '#000000';
      this.addNewStepEl.nativeElement.style.fontWeight = 'normal';
    }
  }
  handleBlur(): void {
    if (!this.addNewStepEl.nativeElement.textContent.trim()) {
      this.addNewStepEl.nativeElement.textContent = 'Kolejny krok';
      this.addNewStepEl.nativeElement.style.color = '#3f51b5';
      this.addNewStepEl.nativeElement.style.fontWeight = '500';
    }
  }
  addNewStep() {
    if (
      !(
        this.addNewStepEl.nativeElement.textContent === '' ||
        this.addNewStepEl.nativeElement.textContent === 'Kolejny krok'
      )
    ) {
      this.stepService.addTodoStep(
        this.todo,
        this.addNewStepEl.nativeElement.textContent
      );
      this.addNewStepEl.nativeElement.textContent = '';
      this.handleBlur();
    }
  }
  closeModal() {
    this.openModal = false;
  }
  showDeleteTodoModal() {
    this.openModal = true;
  }
  addPlannedDate() {
    if (
      this.selectedDate !== null &&
      this.selectedDate !== this.todo.plannedDate
    ) {
      this.todoApiService
        .patchTodo(this.todo.id, {
          isCompleteted: this.todo.isCompleteted,
          name: this.todo.name,
          creationDate: this.todo.creationDate,
          completionData: this.todo.completionData,
          isImportant: this.todo.isImportant,
          steps: this.todo.steps,
          plannedDate: this.selectedDate,
          isTodayDay: this.todo.isTodayDay,
          user_id: this.todo.user_id,
        })
        .subscribe({});
    }
  }
  deletePlannedDate() {
    if (this.todo.plannedDate !== null) {
      this.todoApiService
        .patchTodo(this.todo.id, {
          isCompleteted: this.todo.isCompleteted,
          name: this.todo.name,
          creationDate: this.todo.creationDate,
          completionData: this.todo.completionData,
          isImportant: this.todo.isImportant,
          steps: this.todo.steps,
          plannedDate: null,
          isTodayDay: this.todo.isTodayDay,
          user_id: this.todo.user_id,
        })
        .subscribe({});
    }
  }
  changeIsTodayDay() {
    this.todoApiService
      .patchTodo(this.todo.id, {
        isCompleteted: this.todo.isCompleteted,
        name: this.todo.name,
        creationDate: this.todo.creationDate,
        completionData: this.todo.completionData,
        isImportant: this.todo.isImportant,
        steps: this.todo.steps,
        plannedDate: this.todo.plannedDate,
        isTodayDay: !this.todo.isTodayDay,
        user_id: this.todo.user_id,
      })
      .subscribe({});
  }
}
