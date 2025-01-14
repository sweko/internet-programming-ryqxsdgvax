import { Component } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent {
    currentYear: number = new Date().getFullYear();
    studentName: string = 'Alek';
    studentId: string = '5572';
}
