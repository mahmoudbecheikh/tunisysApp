import { TestBed } from '@angular/core/testing';

import { EmpruntService } from './emprunt.service';

describe('EmpruntService', () => {
  let service: EmpruntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpruntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
