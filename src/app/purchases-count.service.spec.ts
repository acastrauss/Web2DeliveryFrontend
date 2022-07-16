import { TestBed } from '@angular/core/testing';

import { PurchasesCountService } from './purchases-count.service';

describe('PurchasesCountService', () => {
  let service: PurchasesCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasesCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
