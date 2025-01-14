import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  studentName: string = 'Sanja Stefanovic';
  studentId: string = '5617';
  currentYear: number = new Date().getFullYear();
  githubRepo: string = 'https://github.com/your-repo-link'; // Replace with actual repo link
}
