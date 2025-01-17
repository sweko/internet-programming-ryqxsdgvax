import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GradesService } from '../services/grades.service';
import { Grade } from '../models/grade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-degree-detail',
  standalone: false,
  templateUrl: './degree-detail.component.html',
  styleUrl: './degree-detail.component.css'
})
export class DegreeDetailComponent implements OnInit{
  grade: Grade | undefined
  constructor(private route: ActivatedRoute, private router: Router, private gradeService: GradesService) { }
  ngOnInit(): void {
    this.getGradeDetails();
  }
  getGradeDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.gradeService.getGradeById(+id).subscribe((grade: Grade| undefined) => {
        this.grade = grade;
      });
    }
  }
  goToDegreeList(): void {
    this.router.navigate(['/degrees']);
  }
}
