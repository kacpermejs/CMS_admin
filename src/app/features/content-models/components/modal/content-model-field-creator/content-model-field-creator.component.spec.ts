import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModelFieldCreatorComponent } from './content-model-field-creator.component';

describe('ContentModelFieldCreatorComponent', () => {
  let component: ContentModelFieldCreatorComponent;
  let fixture: ComponentFixture<ContentModelFieldCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentModelFieldCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentModelFieldCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
