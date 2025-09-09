import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingMediaSelectionComponent } from './existing-media-selection.component';

describe('ExistingMediaSelectionComponent', () => {
  let component: ExistingMediaSelectionComponent;
  let fixture: ComponentFixture<ExistingMediaSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExistingMediaSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingMediaSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
