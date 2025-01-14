import { TestBed } from '@angular/core/testing';
import { DegreesComponent } from './degrees.component';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';


const mockApiService = {
  getDegrees: () => of([
    { name: 'Computer Science', code: 'CS', yearsToComplete: 4 },
    { name: 'Electrical Engineering', code: 'EE', yearsToComplete: 4 },
  ]),
};


async function testDegreesComponent() {

  await TestBed.configureTestingModule({
    imports: [DegreesComponent], 
    providers: [{ provide: ApiService, useValue: mockApiService }], 
  }).compileComponents();

  
  const fixture = TestBed.createComponent(DegreesComponent);
  const component = fixture.componentInstance;

 
  fixture.detectChanges();

  
  const compiled = fixture.nativeElement as HTMLElement;

  console.log('Component created:', component instanceof DegreesComponent);

  
  const degreeItems = compiled.querySelectorAll('li');
  console.log('Number of degrees:', degreeItems.length);
  console.log('First degree:', degreeItems[0]?.textContent?.trim());
  console.log('Second degree:', degreeItems[1]?.textContent?.trim());
}


testDegreesComponent().then(() => {
  console.log('Testing completed.');
}).catch((error) => {
  console.error('Test failed:', error);
});
