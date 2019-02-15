import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router, NavigationExtras } from '@angular/router';

import { PeopleService } from './people.service';
import { Person } from './person';
import { AppErrorHandler } from '../app-error-handler';

@Injectable()
export class PeopleResolverService implements Resolve<Person[]> {

    constructor(private peopleService: PeopleService, private router: Router, private errorHandler: AppErrorHandler) { }

    resolve(): Promise<Person[]> {
        return this.peopleService.getPeople()
            .catch(error => {
                this.errorHandler.handleErrorPlus('Error getting people.', error);
                return null;  // return null here since we are handling the error and navigating to our error page.
            });
    }
}
