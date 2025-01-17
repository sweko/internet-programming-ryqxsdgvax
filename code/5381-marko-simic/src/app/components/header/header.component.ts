import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <h1>University Management</h1>
      </div>
      <ul class="navbar-nav">
        <li class="nav-item"><a routerLink="/students" class="nav-link">Students</a></li>
        <li class="nav-item"><a routerLink="/degrees" class="nav-link">Degrees</a></li>
        <li class="nav-item"><a routerLink="/courses" class="nav-link">Courses</a></li>
        <li class="nav-item"><a routerLink="/statistics" class="nav-link">Statistics</a></li>
        <li class="nav-item"><a routerLink="/about" class="nav-link">About</a></li>
      </ul>
    </nav>
  `,
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {}
