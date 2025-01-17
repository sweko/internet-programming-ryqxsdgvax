import { TestBed } from '@angular/core/testing';
import { StatisticsComponent } from './statistics.component';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';


const mockApiService = {
  getStudents: () => of([{ id: 1 }, { id: 2 }]), 
  getCourses: () => of([{ id: 1 }, { id: 2 }, { id: 3 }]), 
  getDegrees: () => of([{ id: 1 }]), 
};


async function testStatisticsComponent() {
  let component: StatisticsComponent;

  
  await TestBed.configureTestingModule({
    imports: [StatisticsComponent], 
    providers: [{ provide: ApiService, useValue: mockApiService }], 
  }).compileComponents();


  const fixture = TestBed.createComponent(StatisticsComponent);
  component = fixture.componentInstance;

  
  fixture.detectChanges();

  
  console.log('Component created:', component instanceof StatisticsComponent);
  console.log('Total Students:', component.totalStudents); 
  console.log('Total Courses:', component.totalCourses); 
  console.log('Total Degrees:', component.totalDegrees); 

  
  const compiled = fixture.nativeElement as HTMLElement;
  console.log('Rendered Total Students:', compiled.querySelector('li:nth-child(1)')?.textContent);
  console.log('Rendered Total Courses:', compiled.querySelector('li:nth-child(2)')?.textContent);
  console.log('Rendered Total Degrees:', compiled.querySelector('li:nth-child(3)')?.textContent);
}


testStatisticsComponent()
  .then(() => console.log('Statistics Component Tests Completed'))
  .catch((error) => console.error('Statistics Component Tests Failed:', error));
