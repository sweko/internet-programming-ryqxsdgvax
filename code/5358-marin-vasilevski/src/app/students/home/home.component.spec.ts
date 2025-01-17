import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';


const mockApiService = {
  getStudents: () => of([
    { id: 1, firstName: 'John', lastName: 'Doe', studentId: '2023-0001' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', studentId: '2023-0002' },
  ]),
};


async function testHomeComponent() {
  let component: HomeComponent;

  
  await TestBed.configureTestingModule({
    imports: [HomeComponent], 
    providers: [{ provide: ApiService, useValue: mockApiService }], 
  }).compileComponents();


  const fixture = TestBed.createComponent(HomeComponent);
  component = fixture.componentInstance;

 
  fixture.detectChanges();

  
  console.log('Component created:', component instanceof HomeComponent);

  console.log('Number of students:', component.students.length); 
  console.log('First student:', component.students[0]);

 
  const compiled = fixture.nativeElement as HTMLElement;
  const studentItems = compiled.querySelectorAll('li');
  console.log('Rendered student count:', studentItems.length); 
  console.log('First student rendered:', studentItems[0]?.textContent?.trim());
}


testHomeComponent()
  .then(() => console.log('HomeComponent Tests Completed'))
  .catch((error) => console.error('HomeComponent Tests Failed:', error));
