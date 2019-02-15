import { TestBed, inject } from '@angular/core/testing';

import { MockDataServiceService } from './mock-data-service.service';

describe('MockDataServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockDataServiceService]
    });
  });

  it('should be created', inject([MockDataServiceService], (service: MockDataServiceService) => {
    expect(service).toBeTruthy();
  }));
});
