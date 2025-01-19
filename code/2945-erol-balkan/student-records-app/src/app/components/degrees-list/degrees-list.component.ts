import { Component, OnInit } from '@angular/core';
import { DegreeService, Degree } from '../../services/degree.service';

@Component({
  selector: 'app-degrees-list',
  templateUrl: './degrees-list.component.html',
  styleUrls: ['./degrees-list.component.scss']
})
export class DegreesListComponent implements OnInit {
  degrees: Degree[] = [];

  constructor(private degreeService: DegreeService) {}

  ngOnInit(): void {
    this.fetchDegrees();
  }

  fetchDegrees(): void {
    this.degreeService.getDegrees().subscribe(
      (data: Degree[]) => {
        this.degrees = data;
      },
      (error) => {
        console.error('Error fetching degrees:', error);
      }
    );
  }
}
