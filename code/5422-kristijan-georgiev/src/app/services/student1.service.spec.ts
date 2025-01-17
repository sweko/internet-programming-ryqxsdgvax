import { TestBed } from '@angular/core/testing';

import { Student1Service } from './student1.service';

describe('Student1Service', () => {
  let service: Student1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Student1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
