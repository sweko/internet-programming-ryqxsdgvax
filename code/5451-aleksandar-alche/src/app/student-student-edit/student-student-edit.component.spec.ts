import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStudentEditComponent } from './student-student-edit.component';

describe('StudentStudentEditComponent', () => {
  let component: StudentStudentEditComponent;
  let fixture: ComponentFixture<StudentStudentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentStudentEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentStudentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
