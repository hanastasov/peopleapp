import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PubSubService } from '../../shared/pub-sub.service';
import { Person } from '../person';

@Component({
    selector: 'app-people-details',
    templateUrl: './people-details.component.html',
    styleUrls: ['./people-details.component.scss']
})
export class PeopleDetailsComponent {

    person: Person;

    constructor(private pubSubService: PubSubService,
        private route: ActivatedRoute,
        private router: Router) {

        this.route.data.subscribe(data => {
            this.person = data['person'];
            this.pubSubService.setTitle(`Viewing ${this.person.name}`);
        });
    }

    onEditClicked() {
        this.router.navigate(['people/edit', this.person.id]);
    }

}
