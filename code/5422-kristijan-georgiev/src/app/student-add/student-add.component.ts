import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from '../services/students.service';
import { Student } from '../models/grade';

@Component({
  selector: 'app-student-add',
  standalone: false,
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.css'
})
export class StudentAddComponent implements OnInit{
  newStudent: Student = {id: 0, firstName: '', lastName: '', studentId: '', dateOfBirth: '', email: '', degree: '', year: 0}
  student: Student[];
  constructor(private studentService: StudentsService, private router: Router) {}
 ngOnInit(): void {
   this.getStudents();
 }
 addStudent(): void {
   this.studentService.addStudent(this.newStudent).subscribe(() => {
     this.router.navigate(['/students']);
   });
 }
 goToStudentList(): void {
   this.router.navigate(['/students']);
 }
getStudents(): void {
 this.studentService.getStudents().subscribe((student) => {
   this.student = student;
 });
}
}
