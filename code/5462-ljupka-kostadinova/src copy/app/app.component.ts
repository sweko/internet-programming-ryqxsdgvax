import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule, RouterOutlet } from '@angular/router';
import { delay, Observable, Subject, takeUntil } from 'rxjs';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, HeaderComponent, FooterComponent,         
    ReactiveFormsModule,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // This file should be refactored, feel free to move the code around, create new files, or delete it altogether.
  currentYear: number = 0;

  welcomeMessage = 'Welcome to the Student Management System!';
  statusMessage = 'Checking data connection...';

  routes = [
    { linkName: 'Students', url: '/students' },
    { linkName: 'Degrees', url: '/degrees' },
    { linkName: 'Courses', url: '/courses' },
    { linkName: 'Statistics', url: '/statistics' }
  ];

  private dataTest: Observable<any>;

  // Should this http be here or in a separate file?
  constructor(private http: HttpClient) { 
    this.dataTest = this.http.get('http://localhost:3000', {responseType: "text"}).pipe(delay(1000), takeUntilDestroyed());
  }


  ngOnInit() {
    this.currentYear = new Date().getFullYear();

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
