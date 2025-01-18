import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AboutComponent {
  studentName = 'Stefan Stavrevski';
  studentId = '5445';
  currentYear = new Date().getFullYear();
  githubLink = 'https://github.com/your-repo-link';
}
