import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  studentName: string = 'Your Name';
  studentId: string = '12345';
  currentYear: number = new Date().getFullYear();
}
