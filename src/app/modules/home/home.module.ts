import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { TodoModule } from 'src/app/modules/feature/todo/todo.module';
import { HomeComponent } from './home.component';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TodoModule,
    CoreModule,
    SharedModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
