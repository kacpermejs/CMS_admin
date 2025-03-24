import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEntriesComponent } from './content-entries.component';

describe('ContentEntriesComponent', () => {
  let component: ContentEntriesComponent;
  let fixture: ComponentFixture<ContentEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentEntriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
