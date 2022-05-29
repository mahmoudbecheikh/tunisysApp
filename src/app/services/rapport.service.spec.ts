import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RapportService } from './rapport.service';

describe('RapportService', () => {
  let service: RapportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

    });
    service = TestBed.inject(RapportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
