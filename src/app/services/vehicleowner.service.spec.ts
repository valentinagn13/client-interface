import { TestBed } from '@angular/core/testing';

import { VehicleownerService } from './vehicleowner.service';

describe('VehicleownerService', () => {
  let service: VehicleownerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleownerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
