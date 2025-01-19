import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1>Courses</h1>
    </div>
  `,
  styles: []
})
export class CoursesComponent implements OnInit {
  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.navigationService.setTitle('Courses');
  }
} 