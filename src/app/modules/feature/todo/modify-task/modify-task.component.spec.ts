import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTaskComponent } from './modify-task.component';

describe('ModifyTaskComponent', () => {
  let component: ModifyTaskComponent;
  let fixture: ComponentFixture<ModifyTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyTaskComponent]
    });
    fixture = TestBed.createComponent(ModifyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
