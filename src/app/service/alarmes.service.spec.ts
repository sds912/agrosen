import { TestBed } from '@angular/core/testing';

import { AlarmesService } from './alarmes.service';

describe('AlarmesService', () => {
  let service: AlarmesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
