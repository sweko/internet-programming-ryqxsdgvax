import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  studentName = 'Jovan Tone';
  studentId = '5618';
  currentYear = new Date().getFullYear();
  githubRepo = 'https://github.com/jovan-tone/student-management';
} 