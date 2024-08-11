import { TestBed } from '@angular/core/testing';

import { SaftyChecklistService } from './safty-checklist.service';

describe('SaftyChecklistService', () => {
  let service: SaftyChecklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaftyChecklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
