import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModelEditorComponent } from './content-model-editor.component';

describe('ContentModelEditorComponent', () => {
  let component: ContentModelEditorComponent;
  let fixture: ComponentFixture<ContentModelEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentModelEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentModelEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
