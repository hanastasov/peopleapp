import { TestBed, inject } from '@angular/core/testing';

import { PeopleResolverService } from './people-resolver.service';

describe('PeopleResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeopleResolverService]
    });
  });

  it('should be created', inject([PeopleResolverService], (service: PeopleResolverService) => {
    expect(service).toBeTruthy();
  }));
});
