import { Injectable } from '@angular/core';
import { Student1 } from '../models/student';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private student = {year: 2024, name: 'Kristijan Georgiev', id: 5422 };

  constructor() { }

  getStudent() {
    return this.student;
  }
}