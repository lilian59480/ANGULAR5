import { TestBed } from '@angular/core/testing';

import { PCookieService } from './p-cookie.service';

describe('PCookieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PCookieService = TestBed.get(PCookieService);
    expect(service).toBeTruthy();
  });
});
