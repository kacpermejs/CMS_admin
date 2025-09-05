import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortTextFormInputComponent } from './short-text-form-input.component';

describe('ShortTextFormInputComponent', () => {
  let component: ShortTextFormInputComponent;
  let fixture: ComponentFixture<ShortTextFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortTextFormInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortTextFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
