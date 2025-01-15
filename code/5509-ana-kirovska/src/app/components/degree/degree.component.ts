import { Component,ViewChild } from '@angular/core';
import { Degree } from '../../models/degree.model';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule,MatTableDataSource} from "@angular/material/table"
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort,MatSortModule } from '@angular/material/sort';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DegreeService } from '../../services/degree.service';

@Component({
  selector: 'app-degree',
  imports:[RouterModule,MatIconModule,MatSortModule,MatPaginatorModule,MatTableModule],
  templateUrl: './degree.component.html',
  styleUrl: './degree.component.css'
})
export class DegreeComponent {
  degreeColumns: string[] = ['id', 'name', 'code', 'yearsToComplete', 'active', 'action'];
  degreeDataSource=new MatTableDataSource<Degree>();
  pageSize = 10;
  pageIndex = 0;
  totalItems = 0;  // Initialize with 0

  constructor(private degreeService: DegreeService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getDegrees();  // Fetch students when the component is initialized
  }

  ngAfterViewInit() {
    this.degreeDataSource.paginator = this.paginator;
    this.degreeDataSource.sort = this.sort;

    merge(this.paginator.page, this.sort.sortChange)
      .pipe(tap(() => this.getDegrees()))
      .subscribe();
  }

  // Fetch degree and update totalItems after the data is retrieved
  getDegrees(): void {
    this.degreeService.fetchDegrees().subscribe((data) => {
      this.totalItems = data.length;
      this.degreeDataSource.data = data.slice(
        this.pageIndex * this.pageSize,
        this.pageIndex * this.pageSize + this.pageSize
      );
    });
  }

  deleteDegree(degreeId:number):void{

  }
}
