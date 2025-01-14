import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-degree-list',
  templateUrl: './degree-list.component.html',
  styleUrls: ['./degree-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class DegreeListComponent implements OnInit {
  degrees: any[] = [];
  filteredDegrees: any[] = [];
  filters = {
    active: '',
  };
  sortField: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchDegrees();
  }

  fetchDegrees() {
    this.apiService.getDegrees().subscribe((data) => {
      this.degrees = data;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredDegrees = this.degrees.filter((degree) => {
      const matchesActive =
        this.filters.active === '' ||
        degree.active === JSON.parse(this.filters.active);
      return matchesActive;
    });

    this.sortBy(this.sortField);
  }

  sortBy(field: string) {
    this.sortField = field;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredDegrees.sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];
      return this.sortDirection === 'asc'
        ? valueA > valueB
          ? 1
          : -1
        : valueA < valueB
        ? 1
        : -1;
    });
  }
}
