import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStudentCreateComponent } from './student-student-create.component';

describe('StudentStudentCreateComponent', () => {
  let component: StudentStudentCreateComponent;
  let fixture: ComponentFixture<StudentStudentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentStudentCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentStudentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
