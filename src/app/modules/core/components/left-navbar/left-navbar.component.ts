import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.scss'],
})
export class LeftNavbarComponent {
  @Output() categorySelected = new EventEmitter<string>();
  @Output() closeLeftMenu = new EventEmitter<boolean>();
  currentCategory = 'all';
  selectCategory(category: string) {
    this.categorySelected.emit(category);
    this.currentCategory = category;
  }
  closedLeftMenu() {
    if (window.innerWidth < 1200) {
      this.closeLeftMenu.emit(false);
    }
  }
}
