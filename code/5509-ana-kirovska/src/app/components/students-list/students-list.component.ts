import { Component } from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-students-list',
  imports: [],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css'
})
export class StudentsListComponent {
  students:Student[]=[];
  public studentColumns:string[]=['id','firstName','lastName','dateOfBirth','email','degree','year'];

  constructor(private studentService:StudentService){}

  ngOnInit():void {
      this.getStudents();
  }

  pageSize = 10;
  pageIndex = 0;
  totalItems = this.students.length;

  getStudents():void{
    this.studentService.fetchStudents().subscribe((data)=>{
      console.log("The data from the api is",data);
      this.students=data;
    })
  }
  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.getStudents();
      });
    }
  }
}
