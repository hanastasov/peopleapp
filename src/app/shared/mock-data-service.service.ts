import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Person } from '../people/person';
import { Gender } from '../people/gender';

@Injectable()
export class MockDataServiceService implements InMemoryDbService {

    createDb() {
        const people: Person[] = [
            new Person(
                'http://www.infragistics.com/angular-demos/assets/images/avatar/1.jpg',
                'Jim Smith', 100, new Date(1980, 9, 1), Gender.Male, 5, false),
            new Person(
                'http://www.infragistics.com/angular-demos/assets/images/avatar/21.jpg',
                'Tom Hardy', 101, new Date(1980, 9, 2), Gender.Male, 100, true),
            new Person(
                'http://www.infragistics.com/angular-demos/assets/images/avatar/3.jpg',
                'Abigail Jones', 102, new Date(1989, 9, 3), Gender.Female, 20, false)
        ];
        return { people };
    }
    constructor() {
    }

}
