import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanValidationFormComponent } from './boolean-validation-form.component';

describe('BooleanValidationFormComponent', () => {
  let component: BooleanValidationFormComponent;
  let fixture: ComponentFixture<BooleanValidationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooleanValidationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooleanValidationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
