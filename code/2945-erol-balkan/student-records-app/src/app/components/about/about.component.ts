import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  studentName: string = 'Your Name';
  studentId: string = 'Your ID';
  currentYear: number = new Date().getFullYear();
  githubRepo: string = 'https://github.com/your-repo-link';

  constructor() {}
}
