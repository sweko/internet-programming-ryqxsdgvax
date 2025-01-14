import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header>
      <nav>
        <a routerLink="/students">Home</a>
        <a routerLink="/degrees">Degrees</a>
        <a routerLink="/courses">Courses</a>
        <a routerLink="/statistics">Statistics</a>
        <a routerLink="/about">About</a>
      </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    header {
      background-color: #000;
      color: #fff;
      padding: 1rem;
      text-align: center;
    }
    nav a {
      color: #fff;
      margin: 0 1rem;
      text-decoration: none;
    }
    nav a:hover {
      text-decoration: underline;
    }
  `],
})
export class AppComponent {
  title(arg0: string, title: any) {
    throw new Error('Method not implemented.');
  }
}
