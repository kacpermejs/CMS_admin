import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortTextValidationFormComponent } from './short-text-validation-form.component';

describe('ShortTextValidationFormComponent', () => {
  let component: ShortTextValidationFormComponent;
  let fixture: ComponentFixture<ShortTextValidationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortTextValidationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortTextValidationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
