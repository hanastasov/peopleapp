import { Component, Input, Output, EventEmitter } from '@angular/core';

// code not normally generated
import { Person } from '../person';

@Component({
    selector: 'app-people-list',
    templateUrl: './people-list.component.html',
    styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent {

    // code not normally generated
    @Input()
    people: Person[];

    // code not normally generated
    @Output()
    personSelected: EventEmitter<number> = new EventEmitter<number>();

    constructor() { }

    // code not normally generated
    onPersonSelected(person: Person) {
        this.personSelected.emit(person.id);
    }

}

