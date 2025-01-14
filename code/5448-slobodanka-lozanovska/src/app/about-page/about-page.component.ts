import { Component } from '@angular/core';

@Component({
  selector: 'app-about-page',
  imports: [],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {
  studentName: string = 'Slobodanka Lozanovska';
  studentId: string = '5448';
  currentYear: number = new Date().getFullYear();
  githubRepo: string = 'https://github.com/username/project-repo';
}
