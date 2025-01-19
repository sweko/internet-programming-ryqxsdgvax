import { Component, OnInit } from '@angular/core';
import { Grade } from '../models/grade';
import { GradesService } from '../services/grades.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DegreesService } from '../services/degrees.service';

@Component({
  selector: 'app-degree-list',
  standalone: false,
  templateUrl: './degree-list.component.html',
  styleUrl: './degree-list.component.css'
})
export class DegreeListComponent implements OnInit{
  degrees: Grade[] = [];
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  namefilter: string = '';
  percentagefilter: string = '';
  percentageloaded: boolean = false
  constructor(private degreeService: DegreesService, private router: Router) { }

  ngOnInit(): void {
    this.getGrades();
  }
  sortByID(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.grades.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  }
  
  sortByPercentage(): void {

    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';


    this.grades.sort((a, b) => {
      const percentageA = a.percentage.toLowerCase();
      const percentageB = b.percentage.toLowerCase();

      if (percentageA < percentageB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (percentageA > percentageB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  getGrades(): void {
    this.degreeService.getGrades().subscribe((grades) => {
      this.grades = grades;
      console.log(grades);
    });
  }

  applyFilters(): void {
    this.degreeService.getGrades().subscribe((grades) => {
      this.grades= this.filterGrades(grades);
    });
  }

  filterGrades(grades: Grade[]): Grade[] {
    return grades.filter(grade =>
      this.filterByPercentage(grade)
    )
  }

  filterByPercentage(grade: Grade): boolean {
    return this.percentagefilter === '' || grade.percentage.toLowerCase().includes(this.percentagefilter.toLowerCase());
  } 
  viewGradeDetails(grade: Grade): void {
    this.router.navigate(['/degree-detail', grade.id]);
  }

  editGrade(grade: Grade): void {
    this.router.navigate(['/degree-edit', grade.id]);
  }

  deleteGrade(grade: Grade): void {
    if (confirm('Do you want to delete the degree')) {
      this.degreeService.deleteGrade(grade.id).subscribe(() => {
        this.getGrades();
      });
    }
  }
}
