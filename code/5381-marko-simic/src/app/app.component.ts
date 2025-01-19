import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AppComponent {
  currentYear: number = new Date().getFullYear();
  welcomeMessage: string = 'Welcome to the Student Management System!';
  statusMessage: string = 'Data connection is working!';
  title: string = 'University Management'; // Add this property

  routes = [
    { linkName: 'Students', url: '/students' },
    { linkName: 'Degrees', url: '/degrees' },
    { linkName: 'Courses', url: '/courses' },
    { linkName: 'Statistics', url: '/statistics' },
    { linkName: 'About', url: '/about' },
  ];

  trackByIndex(index: number): number {
    return index;
  }
}
