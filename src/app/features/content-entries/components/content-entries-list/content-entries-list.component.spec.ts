import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEntriesListComponent } from './content-entries-list.component';

describe('ContentEntriesListComponent', () => {
  let component: ContentEntriesListComponent;
  let fixture: ComponentFixture<ContentEntriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentEntriesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentEntriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
