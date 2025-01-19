import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  studentName: string = 'John Doe'; // Replace with the actual student name
  studentId: string = '123456';    // Replace with the actual student ID
  currentYear: number = new Date().getFullYear();
  githubLink: string = 'https://github.com/username/project'; // Replace with your GitHub repository link
}
