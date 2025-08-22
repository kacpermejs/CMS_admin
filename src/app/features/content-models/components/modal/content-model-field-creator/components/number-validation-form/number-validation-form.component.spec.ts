import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberValidationFormComponent } from './number-validation-form.component';

describe('NumberValidationFormComponent', () => {
  let component: NumberValidationFormComponent;
  let fixture: ComponentFixture<NumberValidationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberValidationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberValidationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
