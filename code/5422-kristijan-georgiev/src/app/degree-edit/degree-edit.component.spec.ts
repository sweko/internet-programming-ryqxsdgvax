import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeEditComponent } from './degree-edit.component';

describe('DegreeEditComponent', () => {
  let component: DegreeEditComponent;
  let fixture: ComponentFixture<DegreeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DegreeEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
