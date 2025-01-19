import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  studentName: string = 'Marko Spasovski';
  studentId: string = '5380';
  currentYear: number = new Date().getFullYear();
  githubRepoUrl: string = 'https://github.com/rossiko22/internet-programming-ryqxsdgvax';
}