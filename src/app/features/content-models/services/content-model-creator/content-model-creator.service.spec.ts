import { TestBed } from '@angular/core/testing';

import { ContentModelCreatorService } from './content-model-creator.service';

describe('ContentModelCreatorService', () => {
  let service: ContentModelCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentModelCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
