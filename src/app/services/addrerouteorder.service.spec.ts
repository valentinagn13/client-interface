import { TestBed } from '@angular/core/testing';

import { AddrerouteorderService } from './addrerouteorder.service';

describe('AddrerouteorderService', () => {
  let service: AddrerouteorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddrerouteorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
