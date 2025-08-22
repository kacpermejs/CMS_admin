import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortTextSettingsFormComponent } from './short-text-settings-form.component';

describe('ShortTextSettingsFormComponent', () => {
  let component: ShortTextSettingsFormComponent;
  let fixture: ComponentFixture<ShortTextSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortTextSettingsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortTextSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
