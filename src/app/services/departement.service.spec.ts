import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DepartementService } from './departement.service';

describe('DepartementService', () => {
  let service: DepartementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

    });
    service = TestBed.inject(DepartementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
