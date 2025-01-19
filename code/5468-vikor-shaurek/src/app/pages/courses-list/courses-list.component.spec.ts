import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';


const mockApiService = {
  getCourses: jasmine.createSpy('getCourses').and.returnValue(
    of([
      { name: 'Intro to Programming', code: 'CS101', yearOfStudy: 1, semester: 'Autumn' },
      { name: 'Data Structures', code: 'CS201', yearOfStudy: 2, semester: 'Spring' },
    ])
  ),
};


@Component({
  selector: 'app-courses',
  template: `
    <ul>
      <li *ngFor="let course of courses">
        {{ course.name }} ({{ course.code }})
      </li>
    </ul>
  `,
})
class MockCoursesComponent {
  courses: Array<{ name: string; code: string; yearOfStudy: number; semester: string }> = [];
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.getCourses().subscribe((data) => (this.courses = data));
  }
}

async function testCoursesComponent() {
  
  await TestBed.configureTestingModule({
    declarations: [MockCoursesComponent],
    providers: [{ provide: ApiService, useValue: mockApiService }], 
  }).compileComponents();


  const fixture = TestBed.createComponent(MockCoursesComponent);
  const component = fixture.componentInstance;


  fixture.detectChanges();


  const compiled = fixture.nativeElement as HTMLElement;


  console.log('Component created:', component instanceof MockCoursesComponent);

 
  const courseItems = compiled.querySelectorAll('li');
  console.log('Number of courses:', courseItems.length);
  console.log('First course:', courseItems[0]?.textContent?.trim());
  console.log('Second course:', courseItems[1]?.textContent?.trim());

 
  expect(courseItems.length).toBe(2);
  expect(courseItems[0]?.textContent?.trim()).toBe('Intro to Programming (CS101)');
  expect(courseItems[1]?.textContent?.trim()).toBe('Data Structures (CS201)');
}


testCoursesComponent()
  .then(() => {
    console.log('Testing completed.');
  })
  .catch((error) => {
    console.error('Test failed:', error);
  });
