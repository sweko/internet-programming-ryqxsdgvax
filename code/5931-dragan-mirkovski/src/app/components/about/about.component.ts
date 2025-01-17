import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  currentYear: number = new Date().getFullYear();
  developerName: string = 'Your Name';
  developerId: string = '12345';
}
