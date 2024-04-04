import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { LeftNavbarComponent } from './components/left-navbar/left-navbar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NavbarComponent, LeftNavbarComponent],
  imports: [CommonModule, SharedModule],
  exports: [NavbarComponent, LeftNavbarComponent],
})
export class CoreModule {}
