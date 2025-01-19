import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Degree } from '../../../models/degree.interface';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-degree-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="degree-list-container">
      <h1>Degrees</h1>

      @if (loading) {
        <div class="loading">Loading...</div>
      } @else if (error) {
        <div class="error">{{ error }}</div>
      } @else {
        <table class="degree-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Duration (Years)</th>
              <th>Students</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            @for (degree of degrees; track degree.code) {
              <tr>
                <td>{{ degree.code }}</td>
                <td>{{ degree.name }}</td>
                <td>{{ degree.durationYears }}</td>
                <td>{{ degree.studentCount || 0 }}</td>
                <td>
                  <span [class]="degree.active ? 'status-active' : 'status-inactive'">
                    {{ degree.active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
              </tr>
            }
          </tbody>
        </table>
      }
    </div>
  `,
  styles: [`
    .degree-list-container {
      padding: var(--spacing-lg);
    }

    .degree-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: var(--spacing-lg);
    }

    .degree-table th,
    .degree-table td {
      padding: var(--spacing-sm);
      text-align: left;
      border-bottom: 1px solid var(--primary-light);
    }

    .degree-table th {
      background-color: var(--primary);
      color: var(--white);
    }

    .status-active {
      color: #4caf50;
    }

    .status-inactive {
      color: #f44336;
    }

    .loading {
      text-align: center;
      padding: var(--spacing-xl);
      color: var(--text-secondary);
    }

    .error {
      color: #f44336;
      text-align: center;
      padding: var(--spacing-xl);
    }
  `]
})
export class DegreeListComponent implements OnInit, OnDestroy {
  degrees: Degree[] = [];
  loading = true;
  error = '';
  private destroy$ = new Subject<void>();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getStudents().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (students) => {
        const studentCounts = students.reduce((acc: { [key: string]: number }, student) => {
          acc[student.degree] = (acc[student.degree] || 0) + 1;
          return acc;
        }, {});

        this.api.getDegrees().pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: (degrees) => {
            this.degrees = degrees.map(degree => ({
              ...degree,
              studentCount: studentCounts[degree.code] || 0
            }));
            this.loading = false;
          },
          error: (error) => {
            console.error('Error loading degrees:', error);
            this.error = 'Failed to load degrees';
            this.loading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.error = 'Failed to load student data';
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
} 