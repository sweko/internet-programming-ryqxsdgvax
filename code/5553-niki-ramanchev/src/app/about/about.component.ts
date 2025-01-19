import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  studentName: string = 'Niki Ramanchev';
  studentId: string = '5553';
  currentYear: number = new Date().getFullYear();
  githubRepo: string = 'https://github.com/creamfl/internet-programming-ryqxsdgvax/tree/main/code/5553-niki-ramanchev'; 
}
