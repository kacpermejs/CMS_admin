import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoSettingsFormComponent } from './photo-settings-form.component';

describe('PhotoSettingsFormComponent', () => {
  let component: PhotoSettingsFormComponent;
  let fixture: ComponentFixture<PhotoSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoSettingsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
