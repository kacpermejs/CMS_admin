import { TestBed } from '@angular/core/testing';

import { ContentEntryCreatorService } from './content-entry-creator.service';

describe('ContentEntryCreatorService', () => {
  let service: ContentEntryCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentEntryCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
