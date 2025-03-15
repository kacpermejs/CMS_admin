import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModelsComponent } from './content-models.component';

describe('ContentModelsComponent', () => {
  let component: ContentModelsComponent;
  let fixture: ComponentFixture<ContentModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentModelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
