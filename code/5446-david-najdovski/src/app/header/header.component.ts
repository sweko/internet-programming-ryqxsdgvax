import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, FormsModule, RouterModule] // Add imports here
})
export class HeaderComponent {
  title: string = 'Student Management System';
  navigationLinks: { name: string, path: string }[] = [
    { name: 'Home', path: '/' },
    { name: 'Students', path: '/students' },
    { name: 'Degrees', path: '/degrees' },
    { name: 'Courses', path: '/courses' },
    { name: 'Statistics', path: '/statistics' },
    { name: 'About', path: '/about' }
  ];
}
