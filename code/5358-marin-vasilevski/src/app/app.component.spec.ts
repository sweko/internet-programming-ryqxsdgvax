import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';


async function testAppComponent() {
 
  await TestBed.configureTestingModule({
    imports: [AppComponent], 
  }).compileComponents();

 
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.componentInstance;

 
  console.log('AppComponent created:', app instanceof AppComponent);

  console.log('AppComponent title:', app.title); 

 
  fixture.detectChanges();
  const compiled = fixture.nativeElement as HTMLElement;
  const titleText = compiled.querySelector('h1')?.textContent;
  console.log('Rendered title:', titleText); 
}


testAppComponent()
  .then(() => console.log('AppComponent Tests Completed'))
  .catch((error) => console.error('AppComponent Tests Failed:', error));
