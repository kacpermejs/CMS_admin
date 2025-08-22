import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSettingsFormComponent } from './number-settings-form.component';

describe('NumberSettingsFormComponent', () => {
  let component: NumberSettingsFormComponent;
  let fixture: ComponentFixture<NumberSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberSettingsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
