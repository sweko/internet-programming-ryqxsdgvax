import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  imports: [CommonModule, RouterLink],
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  studentName: string = 'Viktor Panev'; // Replace with your name
  studentId: string = '5190'; // Replace with your ID
  currentYear: number = new Date().getFullYear();
  githubLink: string = 'https://github.com/Pa1nzy/internet-programming-ryqxsdgvax'; // Replace with your repository URL
}
