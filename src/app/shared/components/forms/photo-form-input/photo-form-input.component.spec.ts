import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoFormInputComponent } from './photo-form-input.component';

describe('PhotoFormInputComponent', () => {
  let component: PhotoFormInputComponent;
  let fixture: ComponentFixture<PhotoFormInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFormInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
