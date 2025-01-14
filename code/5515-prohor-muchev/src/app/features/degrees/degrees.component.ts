import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Degree } from '../../shared/interfaces';

@Component({
  selector: 'app-degrees',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="degrees-container">
      <h2>Degrees List</h2>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Years to Complete</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            @for (degree of degrees; track degree.id) {
              <tr>
                <td>{{ degree.code }}</td>
                <td>{{ degree.name }}</td>
                <td>{{ degree.yearsToComplete }}</td>
                <td>{{ degree.active ? 'Active' : 'Inactive' }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .degrees-container {
      padding: var(--spacing-md);
    }
    .table {
      width: 100%;
      border-collapse: collapse;
    }
    .table th, .table td {
      padding: var(--spacing-sm);
      border: 1px solid lightgray;
    }
  `]
})
export class DegreesComponent implements OnInit {
  degrees: Degree[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadDegrees();
  }

  loadDegrees() {
    this.dataService.getDegrees().subscribe({
      next: (data) => {
        this.degrees = data;
      },
      error: (error) => {
        console.error('Error loading degrees:', error);
      }
    });
  }
}

export default DegreesComponent; 