import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  welcomeMessage = 'Welcome to the Student Management System';
  statusMessage = 'Checking data connection...';

  routes = [
    { linkName: 'Students', url: '/students' },
    { linkName: 'Degrees', url: '/degrees' },
    { linkName: 'Courses', url: '/courses' },
    { linkName: 'Statistics', url: '/statistics' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/students').subscribe({
      next: () => {
        this.statusMessage = 'Connected to data server successfully!';
      },
      error: (error) => {
        this.statusMessage = `Connection failed! ${error.message}`;
        console.error('API Error:', error);
      }
    });
  }
}
