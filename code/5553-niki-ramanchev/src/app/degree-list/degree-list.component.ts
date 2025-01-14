import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-degree-list',
  imports:[CommonModule, FormsModule],
  templateUrl: './degree-list.component.html',
  styleUrls: ['./degree-list.component.css']
})
export class DegreeListComponent implements OnInit {
  degrees: any[] = [];  
  errorMessage = '';

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.fetchDegrees();
  }

  fetchDegrees(): void {
    this.studentService.getDegrees().subscribe({
      next: (data) => {
        this.degrees = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch degrees. Please try again later.';
        console.error(err);
      }
    });
  }
}
