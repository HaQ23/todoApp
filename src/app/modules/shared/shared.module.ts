import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './componetns/modal/modal.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
@NgModule({
  declarations: [ModalComponent, CustomDatePipe],
  imports: [CommonModule, MaterialModule],
  exports: [
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ModalComponent,
    CustomDatePipe,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
