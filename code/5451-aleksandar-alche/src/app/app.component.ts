import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule, RouterOutlet } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  routes = [
    { linkName: 'Students', url: '/students' },
    { linkName: 'Degrees', url: '/degrees' },
    { linkName: 'Courses', url: '/courses' },
    { linkName: 'Statistics', url: '/statistics' }
  ];

  currentYear: number = new Date().getFullYear();
  statusMessage: string = 'Checking data connection...';

  private dataTest: Observable<any>;

  constructor(private http: HttpClient) {
    this.dataTest = this.http.get('http://localhost:3000', { responseType: 'text' }).pipe(
      delay(1000),
      takeUntilDestroyed()
    );
  }

  ngOnInit() {
    this.dataTest.subscribe({
      next: _ => {
        this.statusMessage = 'Data connection is working!';
      },
      error: (error) => {
        this.statusMessage = `Data connection failed (see console for details)! ${error.message}`;
        console.error(error);
      }
    });
  }
}
