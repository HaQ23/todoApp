import {
  Component,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;

  title = 'todoapp';
  selectedCategory: string = 'all';
  sidenavOpened = window.innerWidth >= 1200;
  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit() {
    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize();
    this.cdr.detectChanges();
  }
  onCategorySelected(category: string) {
    this.selectedCategory = category;
  }
  toggleOpenMenu(e: boolean) {
    this.sidenavOpened = !this.sidenavOpened;
  }
  onResize() {
    this.sidenavOpened = window.innerWidth >= 1200;
    if (this.sidenav) {
      this.sidenav.mode = this.sidenavOpened ? 'side' : 'over';
    }
  }
}
