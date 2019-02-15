import { TestBed, inject } from '@angular/core/testing';

import { PeopleEditGuardService } from './people-edit-guard.service';

describe('PeopleEditGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeopleEditGuardService]
    });
  });

  it('should be created', inject([PeopleEditGuardService], (service: PeopleEditGuardService) => {
    expect(service).toBeTruthy();
  }));
});
