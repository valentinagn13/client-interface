import { TestBed } from '@angular/core/testing';

import { DistributionCenterService } from './distribution-center.service';

describe('DistributionCenterService', () => {
  let service: DistributionCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistributionCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
