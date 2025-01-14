import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreesListComponent } from './degrees-list.component';

describe('DegreesListComponent', () => {
  let component: DegreesListComponent;
  let fixture: ComponentFixture<DegreesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DegreesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
