import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModelViewerComponent } from './content-model-viewer.component';

describe('ContentModelViewerComponent', () => {
  let component: ContentModelViewerComponent;
  let fixture: ComponentFixture<ContentModelViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentModelViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentModelViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
