import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student1 } from '../models/student';
import { StudentService } from '../services/student1.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-footer',
  standalone: false,
  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  Student: Student1 | undefined
  private student = {year: 2024, name: 'Kristijan Georgiev', id: 5422};
  constructor(private route: ActivatedRoute, private studentsService: StudentService) { }
  ngOnInit(): void {
    this.getStudent();
  }
 
  getStudent() : void {
    this.Student=this.studentsService.getStudent()
  } 
}