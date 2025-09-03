import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberFormInputComponent } from './number-form-input.component';

describe('NumberFormInputComponent', () => {
  let component: NumberFormInputComponent;
  let fixture: ComponentFixture<NumberFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberFormInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
