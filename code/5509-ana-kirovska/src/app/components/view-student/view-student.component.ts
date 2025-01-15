import { Component } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { NgIf,NgFor } from '@angular/common'; 

@Component({
  selector: 'app-view-student',
  imports: [MatCardModule,NgIf,NgFor,RouterModule],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent {
  student:Student | null=null;
  studentId!: number;

  constructor(private route: ActivatedRoute,
              private studentService: StudentService,
              private router: Router
            ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.studentId = +id;  // Convert to number
        this.getStudent(this.studentId);
      }
    }); // Fetch students when the component is initialized
  }

  getStudent(studentId:number): void {
    this.studentService.fetchSpecificStudent(studentId).subscribe((data)=>{
      this.student=data;
    })
  }

  goBack(): void {
    this.router.navigate(['/students']); // Navigate back to student listing
  }
}
