import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeUtilTsComponent } from './grade.util.ts.component';

describe('GradeUtilTsComponent', () => {
  let component: GradeUtilTsComponent;
  let fixture: ComponentFixture<GradeUtilTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeUtilTsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeUtilTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
