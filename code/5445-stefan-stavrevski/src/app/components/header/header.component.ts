import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterModule],
})
export class HeaderComponent implements OnInit {
  routes = [
    { linkName: 'Students', url: '/students' },
    { linkName: 'Degrees', url: '/degrees' },
    { linkName: 'Courses', url: '/courses' },
    { linkName: 'Statistics', url: '/statistics' },
  ];

  statusMessage = 'Checking data connection...';

  private dataTest: Observable<any>;

  constructor(private http: HttpClient) {
    this.dataTest = this.http
      .get('http://localhost:3000', { responseType: 'text' })
      .pipe(delay(1000), takeUntilDestroyed());
  }

  ngOnInit() {
    this.dataTest.subscribe({
      next: (_) => {
        this.statusMessage = 'Data connection is working!';
      },
      error: (error) => {
        this.statusMessage = `Data connection failed (see console for details)! ${error.message}`;
        console.error(error);
      },
    });
  }
}
