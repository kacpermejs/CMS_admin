import { TestBed } from '@angular/core/testing';

import { ContentEntriesService } from './content-entries.service';

describe('ContentEntriesService', () => {
  let service: ContentEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
