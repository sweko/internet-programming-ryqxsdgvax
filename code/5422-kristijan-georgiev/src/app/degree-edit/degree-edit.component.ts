import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Grade } from '../models/grade';
import { GradesService } from '../services/grades.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-degree-edit',
  imports: [],
  templateUrl: './degree-edit.component.html',
  styleUrl: './degree-edit.component.css'
})
export class DegreeEditComponent implements OnInit{
  grade: Grade | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gradeService:GradesService
  ) {}

  ngOnInit(): void {
    this.getDegreeDetails();
    this.getDegrees();
  }
  getDegreeDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.degreeService.getGradeById(+id).subscribe((grade) => {
        this.grade = grade;
      });
    }
  }
  getDegrees(): void {
    this.degreeService.getGrades().subscribe((grades) => {
      this.grade = this.grade;
    });
  }
  saveChanges(): void {
    if (this.grade) {
      this.degreeService.updateGrade(this.grade).subscribe(() => {
        this.router.navigate(['/degrees', this.grade!.id]);
      });
    }
 }
}
