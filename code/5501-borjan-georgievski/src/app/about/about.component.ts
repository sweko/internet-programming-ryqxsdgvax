import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  studentName: string = 'Borjan Georgievski';  
  studentId: string = '5501';  
  currentYear: number = new Date().getFullYear();
  githubRepository: string = 'https://github.com/6orjan/';  

  constructor() {}

  ngOnInit(): void {}
}
