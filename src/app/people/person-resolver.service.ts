import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router, NavigationExtras } from '@angular/router';

import { PeopleService } from './people.service';
import { Person } from './person';
import { AppErrorHandler } from '../app-error-handler';

@Injectable()
export class PersonResolverService implements Resolve<Person> {

    constructor(private peopleService: PeopleService, private router: Router, private errorHandler: AppErrorHandler) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<Person> {
        if (route.routeConfig.path === 'add') {
            return this.peopleService.getNewPerson()
                .catch(error => {
                    this.errorHandler.handleErrorPlus('Error creating new person.', error);
                    return null;  // return null here since we are handling the error and navigating to our error page.
                });

        } else {
            return this.peopleService.getPerson(route.params.id)
                .catch(error => {
                    this.errorHandler.handleErrorPlus('Error getting person.', error);
                    return null;  // return null here since we are handling the error and navigating to our error page.
                });
        }
    }
}
