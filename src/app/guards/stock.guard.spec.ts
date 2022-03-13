import { TestBed } from '@angular/core/testing';

import { StockGuard } from './stock.guard';

describe('StockGuard', () => {
  let guard: StockGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StockGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
