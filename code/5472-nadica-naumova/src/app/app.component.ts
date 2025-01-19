 // src/app/app.component.ts
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <!-- Status Message -->
    @if (statusMessage) {
      <div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
        <p>{{statusMessage}}</p>
      </div>
    }

    <!-- Navigation -->
    <app-navbar></app-navbar>

    <!-- Main Content -->
    <main class="container mx-auto p-4">
      <router-outlet></router-outlet>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-100 mt-8 py-4">
      <div class="container mx-auto px-4 text-center text-gray-600">
        <p>© {{currentYear}} Student Management System</p>
      </div>
    </footer>
  `
})
export class AppComponent implements OnInit {
  currentYear: number = 0;
  welcomeMessage = 'Welcome to the Student Management System!';
  statusMessage = 'Checking data connection...';

  routes = [
    { linkName: 'Students', url: '/students' },
    { linkName: 'Degrees', url: '/degrees' },
    { linkName: 'Courses', url: '/courses' },
    { linkName: 'Statistics', url: '/statistics' }
  ];

  private dataTest: Observable<any>;

  constructor(private http: HttpClient) {
    this.dataTest = this.http.get('http://localhost:3000', {responseType: "text"})
      .pipe(
        delay(1000),
        takeUntilDestroyed()
      );
  }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();

    this.dataTest.subscribe({
      next: _ => {
        this.statusMessage = 'Data connection is working!';
        
        setTimeout(() => {
          this.statusMessage = '';
        }, 3000);
      },
      error: (error) => {
        this.statusMessage = `Data connection failed (see console for details)! ${error.message}`;
        console.error(error);
      }
    });
  }
}