import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModelListComponent } from './content-model-list.component';

describe('ContentModelListComponent', () => {
  let component: ContentModelListComponent;
  let fixture: ComponentFixture<ContentModelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentModelListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentModelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
