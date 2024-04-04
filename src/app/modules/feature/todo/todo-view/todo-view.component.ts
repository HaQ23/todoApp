import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Todo } from 'src/app/modules/core/interfaces/todo.interface';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss'],
})
export class TodoViewComponent implements OnChanges {
  @Input() category!: string;
  @Output() openedLeftMenu = new EventEmitter<boolean>();
  selectedTask: Todo | null = null;
  isOpenLeftMenu = false;
  closeBtnCliked = false;
  sectionTitle = 'Zadania';
  iconName = 'home';
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['category'].currentValue !== changes['category'].previousValue &&
      !changes['category'].isFirstChange()
    ) {
      this.changeTitleName();
    }
  }
  handleSelectedTask(todo: Todo) {
    this.closeBtnCliked = false;
    if (todo === this.selectedTask) {
      this.selectedTask = null;
      return;
    }
    this.selectedTask = todo;
  }
  closeModifySection(e: boolean) {
    this.closeBtnCliked = true;
  }
  changeTitleName() {
    if (this.category === 'myDay') {
      this.sectionTitle = 'Mój dzień';
      this.iconName = 'wb_sunny';
    } else if (this.category === 'important') {
      this.sectionTitle = 'Ważne';
      this.iconName = 'star_border';
    } else if (this.category === 'planned') {
      this.sectionTitle = 'Zaplanowane';
      this.iconName = 'calendar_today';
    } else {
      this.sectionTitle = 'Zadania';
      this.iconName = 'home';
    }
  }
  getCategoryClass() {
    switch (this.category) {
      case 'important':
        return 'important-class';
      case 'myDay':
        return 'my-day-class';
      case 'planned':
        return 'planned-class';
      default:
        return '';
    }
  }
  openLeftMenu() {
    this.isOpenLeftMenu = !this.isOpenLeftMenu;
    this.openedLeftMenu.emit(this.isOpenLeftMenu);
  }
}
