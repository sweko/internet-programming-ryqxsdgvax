
import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';


const mockApiService = {
  getDegrees: jasmine.createSpy('getDegrees').and.returnValue(
    of([
      { name: 'Computer Science', code: 'CS', yearsToComplete: 4 },
      { name: 'Electrical Engineering', code: 'EE', yearsToComplete: 4 },
    ])
  ),
};


@Component({
  selector: 'app-degrees',
  template: `
    <ul>
      <li *ngFor="let degree of degrees">
        {{ degree.name }} ({{ degree.code }}) - {{ degree.yearsToComplete }} years
      </li>
    </ul>
  `,
})
class MockDegreesComponent {
  degrees: Array<{ name: string; code: string; yearsToComplete: number }> = [];
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.getDegrees().subscribe((data) => (this.degrees = data));
  }
}

async function testDegreesComponent() {
 
  TestBed.configureTestingModule({
    declarations: [MockDegreesComponent],
    providers: [{ provide: ApiService, useValue: mockApiService }],
  });
  await TestBed.compileComponents();


  const fixture = TestBed.createComponent(MockDegreesComponent);
  const component = fixture.componentInstance;

  
  fixture.detectChanges();


  const compiled = fixture.nativeElement as HTMLElement;

 
  console.log('Component created:', component instanceof MockDegreesComponent);

  const degreeItems = compiled.querySelectorAll('li');
  console.log('Number of degrees:', degreeItems.length);
  console.log('First degree:', degreeItems[0]?.textContent?.trim());
  console.log('Second degree:', degreeItems[1]?.textContent?.trim());

 
  expect(degreeItems.length).toBe(2);
  expect(degreeItems[0]?.textContent?.trim()).toBe('Computer Science (CS) - 4 years');
  expect(degreeItems[1]?.textContent?.trim()).toBe('Electrical Engineering (EE) - 4 years');
}


testDegreesComponent()
  .then(() => {
    console.log('Testing completed.');
  })
  .catch((error) => {
    console.error('Test failed:', error);
  });
function compileComponents() {
  throw new Error('Function not implemented.');
}

