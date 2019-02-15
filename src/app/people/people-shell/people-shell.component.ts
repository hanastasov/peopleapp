import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationError, Event, NavigationExtras } from '@angular/router';
import { Person } from '../person';
import { PubSubService } from '../../shared/pub-sub.service';
import { PeopleService } from '../people.service';
import { Subscription } from 'rxjs';
import { AppErrorHandler } from '../../app-error-handler';

@Component({
    selector: 'app-people-shell',
    templateUrl: './people-shell.component.html',
    styleUrls: ['./people-shell.component.scss']
})
export class PeopleShellComponent implements OnInit, OnDestroy, AfterViewInit {

    people: Person[];
    private addPersonRequested: Subscription;
    private personCollectionUpdatedRequested: Subscription;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private pubSubService: PubSubService,
        private peopleService: PeopleService,
        private errorHandler: AppErrorHandler) {

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                if (this.router.url === '/people' && this.people && this.people.length > 0) {
                    // this code only runs when the user is on this page and uses the menu
                    // to navigate to the people app.
                    this.onPersonSelected(this.people[0].id);
                }
            }
        });
    }

    onPersonSelected(payload: number) {
        this.router.navigate(['people/details', payload]);
    }

    ngOnInit() {
        this.people = this.route.snapshot.data['people'];
        this.addPersonRequested = this.pubSubService.addRequested$.subscribe(() =>
            this.router.navigate(['people/add'])
        );
        this.personCollectionUpdatedRequested = this.pubSubService.personCollectionUpdatedRequested$.subscribe(() =>
            this.refreshData()
        );
    }

    refreshData(): void {
        this.peopleService.getPeople()
            .then(people => {
                this.people = people;
                this.afterDataLoaded();
            })
            .catch(error => {
                this.errorHandler.handleErrorPlus('Error getting people.', error);
            });
    }

    afterDataLoaded(): void {
        // if people has data we load up the first record in the details pane
        // if not go to the add page.
        if (this.people && this.people.length > 0) {
            this.onPersonSelected(this.people[0].id);
            return;
        }

        if (!this.people || this.people.length === 0) {
            this.router.navigate(['people/add']);
            return;
        }
    }

    ngAfterViewInit() {
        if (this.router.url === '/people') {
            // this is called when the menu is use tod navigate here
            this.afterDataLoaded();
        }
    }

    ngOnDestroy(): void {
        this.addPersonRequested.unsubscribe();
        this.personCollectionUpdatedRequested.unsubscribe();
    }
}
