import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoValidationFormComponent } from './photo-validation-form.component';

describe('PhotoValidationFormComponent', () => {
  let component: PhotoValidationFormComponent;
  let fixture: ComponentFixture<PhotoValidationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoValidationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoValidationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
