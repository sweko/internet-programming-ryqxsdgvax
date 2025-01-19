import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeAddComponent } from './degree-add.component';

describe('DegreeAddComponent', () => {
  let component: DegreeAddComponent;
  let fixture: ComponentFixture<DegreeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DegreeAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
