import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { StudentEditComponent } from './student-edit.component';
import { ApiService } from '../../services/api.service';

describe('StudentEditComponent', () => {
  let component: StudentEditComponent;
  let fixture: ComponentFixture<StudentEditComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const mockStudent = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    degree: 'Computer Science',
    year: 3
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiService', ['getStudentById', 'updateStudent']);
    spy.getStudentById.and.returnValue(of(mockStudent));
    spy.updateStudent.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [
        StudentEditComponent,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        { provide: ApiService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentEditComponent);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with student data', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(apiServiceSpy.getStudentById).toHaveBeenCalledWith(1);
    expect(component.studentForm.value).toEqual(mockStudent);
  }));

  it('should handle error when loading student fails', fakeAsync(() => {
    apiServiceSpy.getStudentById.and.returnValue(throwError(() => new Error('Network error')));
    
    fixture.detectChanges();
    tick();

    expect(component.errorMessage).toContain('Error loading student');
    expect(component.isLoading).toBeFalse();
  }));

  it('should not save when form is invalid', () => {
    fixture.detectChanges();
    component.studentForm.controls['firstName'].setValue('');
    
    component.saveStudent();

    expect(apiServiceSpy.updateStudent).not.toHaveBeenCalled();
    expect(component.errorMessage).toContain('Please fill in all required fields');
  });

  it('should save student successfully', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    fixture.detectChanges();
    
    component.studentForm.patchValue(mockStudent);
    component.saveStudent();
    tick();

    expect(apiServiceSpy.updateStudent).toHaveBeenCalledWith(1, mockStudent);
    expect(navigateSpy).toHaveBeenCalledWith(['/students']);
    expect(component.isLoading).toBeFalse();
  }));

  it('should handle error when saving student fails', fakeAsync(() => {
    apiServiceSpy.updateStudent.and.returnValue(throwError(() => new Error('Save failed')));
    fixture.detectChanges();
    
    component.studentForm.patchValue(mockStudent);
    component.saveStudent();
    tick();

    expect(component.errorMessage).toContain('Error updating student');
    expect(component.isLoading).toBeFalse();
  }));

  it('should validate form fields correctly', () => {
    fixture.detectChanges();
    
    // Test required fields
    expect(component.isFieldInvalid('firstName')).toBeFalse();
    component.studentForm.controls['firstName'].setValue('');
    component.studentForm.controls['firstName'].markAsTouched();
    expect(component.isFieldInvalid('firstName')).toBeTrue();

    // Test email validation
    component.studentForm.controls['email'].setValue('invalid-email');
    component.studentForm.controls['email'].markAsTouched();
    expect(component.isFieldInvalid('email')).toBeTrue();
    
    component.studentForm.controls['email'].setValue('valid@email.com');
    expect(component.isFieldInvalid('email')).toBeFalse();

    // Test year validation
    component.studentForm.controls['year'].setValue(0);
    component.studentForm.controls['year'].markAsTouched();
    expect(component.isFieldInvalid('year')).toBeTrue();
    
    component.studentForm.controls['year'].setValue(5);
    expect(component.isFieldInvalid('year')).toBeTrue();
    
    component.studentForm.controls['year'].setValue(3);
    expect(component.isFieldInvalid('year')).toBeFalse();
  });

  it('should handle missing student ID', fakeAsync(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [StudentEditComponent, RouterTestingModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ApiService, useValue: apiServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    });

    const newFixture = TestBed.createComponent(StudentEditComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();
    tick();

    expect(newComponent.errorMessage).toContain('Student ID is missing');
    expect(apiServiceSpy.getStudentById).not.toHaveBeenCalled();
  }));
});