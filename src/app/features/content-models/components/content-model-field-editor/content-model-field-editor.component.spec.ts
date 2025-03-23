import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModelFieldEditorComponent } from './content-model-field-editor.component';

describe('ContentModelFieldEditorComponent', () => {
  let component: ContentModelFieldEditorComponent;
  let fixture: ComponentFixture<ContentModelFieldEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentModelFieldEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentModelFieldEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
