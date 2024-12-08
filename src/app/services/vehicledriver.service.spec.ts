import { TestBed } from '@angular/core/testing';

import { VehicledriverService } from './vehicledriver.service';

describe('VehicledriverService', () => {
  let service: VehicledriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicledriverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
