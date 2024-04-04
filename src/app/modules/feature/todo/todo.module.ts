import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoViewComponent } from './todo-view/todo-view.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TodoComponent } from './todo-list/todo/todo.component';
import { SharedModule } from '../../shared/shared.module';
import { ModifyTaskComponent } from './modify-task/modify-task.component';
import { StepsComponent } from './modify-task/steps/steps.component';
import { StepComponent } from './modify-task/steps/step/step.component';

@NgModule({
  declarations: [
    TodoViewComponent,
    TodoListComponent,
    AddTaskComponent,
    TodoComponent,
    ModifyTaskComponent,
    StepsComponent,
    StepComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [TodoViewComponent],
})
export class TodoModule {}
