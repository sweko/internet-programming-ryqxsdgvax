import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../models/grade';
import { StudentService } from '../services/student1.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: false,
  
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
  Student: Student | undefined
  private student = {year: 2024, name: 'Kristijan Georgiev', id: 5422};
  constructor(private route: ActivatedRoute, private studentsservice: StudentService) { }
  ngOnInit(): void {
    this.getStudent();
  }
 
  getStudent() : void {
    this.Student =this.studentsservice.getStudent()
  } 
}