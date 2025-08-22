import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanSettingsFormComponent } from './boolean-settings-form.component';

describe('BooleanSettingsFormComponent', () => {
  let component: BooleanSettingsFormComponent;
  let fixture: ComponentFixture<BooleanSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooleanSettingsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooleanSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
