import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GradesService } from '../services/grades.service';
import { Grade } from '../models/grade';
@Component({
  selector: 'app-degree-add',
  imports: [],
  templateUrl: './degree-add.component.html',
  styleUrl: './degree-add.component.css'
})
export class DegreeAddComponent implements OnInit{
  newGrade: Grade = {id: 0, percentage: 0, letter: ''}
  degree: Grade[] = [];
  constructor(private degreeService: GradeService, private router: Router) {}
 ngOnInit(): void {
   this.getDegrees();
 }
 addDegree(): void {
   this.degreeService.addDegree(this.newGrade).subscribe(() => {
     this.router.navigate(['/degrees']);
   });
 }
 goToDegreeList(): void {
   this.router.navigate(['/degrees']);
 }
getDegrees(): void {
 this.degreeService.getDegrees().subscribe((degree) => {
   this.degree = degree;
 });
}
}
