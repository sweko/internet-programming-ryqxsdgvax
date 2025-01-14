import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentYear: number = new Date().getFullYear();
  welcomeMessage = 'Welcome to the Student Management System!';
  routes = [
    { linkName: 'Students', url: '/students' },
    { linkName: 'Create Student', url: '/students/create' },
    { linkName: 'Statistics', url: '/statistics' },
    { linkName: 'About', url: '/about' },
  ];
}
