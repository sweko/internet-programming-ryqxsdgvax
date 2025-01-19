import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private title = new BehaviorSubject<string>('Student Management System');

  constructor(
    private router: Router,
    private location: Location,
    private titleService: Title
  ) {
    // Subscribe to title changes
    this.title.subscribe(newTitle => {
      this.titleService.setTitle(`${newTitle} - Student Management System`);
    });

    // Listen to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentUrl = this.router.url;
      if (currentUrl.includes('courses')) {
        this.setTitle('Courses');
      } else if (currentUrl.includes('degrees')) {
        this.setTitle('Degrees');
      } else if (currentUrl.includes('statistics')) {
        this.setTitle('Statistics');
      } else if (currentUrl.includes('about')) {
        this.setTitle('About');
      } else if (currentUrl.includes('students')) {
        this.setTitle('Students');
      }
    });
  }

  goToStudentList(): Promise<boolean> {
    this.setTitle('Students');
    return this.router.navigate(['/students']);
  }

  goToStudentDetail(id: number): Promise<boolean> {
    this.setTitle('Student Details');
    return this.router.navigate(['/students', id]);
  }

  goToStudentEdit(id: number): Promise<boolean> {
    this.setTitle('Edit Student');
    return this.router.navigate(['/students', id, 'edit']);
  }

  goToStudentCreate(): Promise<boolean> {
    this.setTitle('Create Student');
    return this.router.navigate(['/students/create']);
  }

  goToDegrees(): Promise<boolean> {
    this.setTitle('Degrees');
    return this.router.navigate(['/degrees']);
  }

  goToCourses(): Promise<boolean> {
    this.setTitle('Courses');
    return this.router.navigate(['/courses']);
  }

  goToStatistics(): Promise<boolean> {
    this.setTitle('Statistics');
    return this.router.navigate(['/statistics']);
  }

  goToAbout(): Promise<boolean> {
    this.setTitle('About');
    return this.router.navigate(['/about']);
  }

  goBack(): void {
    this.location.back();
  }

  setTitle(newTitle: string) {
    this.title.next(newTitle);
  }
} 