import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxFormInputComponent } from './checkbox-form-input.component';

describe('CheckboxFormInputComponent', () => {
  let component: CheckboxFormInputComponent;
  let fixture: ComponentFixture<CheckboxFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxFormInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
