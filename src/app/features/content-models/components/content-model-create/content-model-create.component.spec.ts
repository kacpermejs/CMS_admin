import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModelCreateComponent } from './content-model-create.component';

describe('ContentModelCreateComponent', () => {
  let component: ContentModelCreateComponent;
  let fixture: ComponentFixture<ContentModelCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentModelCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentModelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
