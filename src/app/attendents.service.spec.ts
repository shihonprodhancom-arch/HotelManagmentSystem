import { TestBed } from '@angular/core/testing';

import { AttendentsService } from './attendents.service';

describe('AttendentsService', () => {
  let service: AttendentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
