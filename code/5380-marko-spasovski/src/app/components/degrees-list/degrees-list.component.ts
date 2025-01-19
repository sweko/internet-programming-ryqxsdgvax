import { Component } from '@angular/core';
import { Degree } from '../../models/degree.model';
import { DegreeService } from '../../services/degree.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-degrees-list',
  imports: [CommonModule],
  templateUrl: './degrees-list.component.html',
  styleUrl: './degrees-list.component.css'
})
export class DegreesListComponent {
  degrees: Degree[] = [];


  constructor(
    private degreeService: DegreeService
  ){}


  ngOnInit(): void {
    this.degreeService.getDegrees().subscribe((degrees: Degree[]) => {
      this.degrees = degrees;
    });
  }
}
