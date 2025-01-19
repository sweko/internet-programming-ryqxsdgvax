import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students = [
    { id: 1, name: 'John Doe', age: 20, degree: 'Computer Science' },
    { id: 2, name: 'Jane Smith', age: 22, degree: 'Mathematics' },
    { id: 3, name: 'Alice Johnson', age: 21, degree: 'Physics' },
    { id: 4, name: 'Michael Brown', age: 23, degree: 'Chemistry' },
    { id: 5, name: 'Emily Davis', age: 19, degree: 'Biology' },
    { id: 6, name: 'David Wilson', age: 24, degree: 'Engineering' },
    { id: 7, name: 'Sophia Miller', age: 22, degree: 'Psychology' },
    { id: 8, name: 'James Garcia', age: 21, degree: 'History' },
    { id: 9, name: 'Olivia Martinez', age: 20, degree: 'Literature' },
    { id: 10, name: 'Daniel Rodriguez', age: 23, degree: 'Business Administration' },
    { id: 11, name: 'Isabella Hernandez', age: 19, degree: 'Graphic Design' },
    { id: 12, name: 'Ethan Lee', age: 22, degree: 'Information Technology' },
    { id: 13, name: 'Mia Gonzalez', age: 21, degree: 'Nursing' },
    { id: 14, name: 'Alexander Perez', age: 24, degree: 'Economics' },
    { id: 15, name: 'Charlotte Wilson', age: 20, degree: 'Environmental Science' }
  ];

  constructor() {}

  ngOnInit(): void {}
}