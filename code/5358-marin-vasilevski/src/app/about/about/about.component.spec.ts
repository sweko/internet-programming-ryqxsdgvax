import { TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

async function testAboutComponent() {
  
  await TestBed.configureTestingModule({
    imports: [AboutComponent], 
  }).compileComponents();

 
  const fixture = TestBed.createComponent(AboutComponent);
  const component = fixture.componentInstance;

  
  fixture.detectChanges();

  const compiled = fixture.nativeElement as HTMLElement;

  console.log('Component created:', component instanceof AboutComponent);
  console.log('Creator\'s name:', compiled.querySelector('p:first-child')?.textContent);
  console.log('Student ID:', compiled.querySelector('p:nth-child(2)')?.textContent);
  console.log('Current year:', compiled.querySelector('p:nth-child(3)')?.textContent);
  console.log('GitHub link text:', compiled.querySelector('a')?.textContent);
  console.log('GitHub link href:', compiled.querySelector('a')?.getAttribute('href'));
}


testAboutComponent().then(() => {
  console.log('Testing completed.');
}).catch((error) => {
  console.error('Test failed:', error);
});
