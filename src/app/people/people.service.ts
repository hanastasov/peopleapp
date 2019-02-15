import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';


import { Person } from './person';
import { Gender } from './gender';

@Injectable()
export class PeopleService {

    private peopleUrl: string = 'app/people';
    private cudOptions: RequestOptions;

    constructor(private http: Http) {
        this.cudOptions = new RequestOptions();
        this.cudOptions.headers = new Headers({ 'Content-Type': 'application/json' });  // create, update, delete options
    }

    savePerson(person: Person): Promise<Response> {
        if (person.id) {
            return this.updatePerson(person);
        }
        return this.addPerson(person);
    }

    private addPerson(person: Person): Promise<Response> {
        const body = JSON.stringify(person);
        return this.http
            .post(this.peopleUrl, body, this.cudOptions)
            .toPromise()
            .then(response => {
                // success response contains the newly added person with the id populated
                // for this app, I don't need the id, since I'm reloading the items in the list.
                // your app my need to get the new id value assigned, you can easily get it here.
                const responseBody = response.json();
                return responseBody || {};
            })
            .catch(this.handlerError);
    }

    private updatePerson(person: Person): Promise<Response> {
        const body = JSON.stringify(person);
        return this.http
            .put(this.peopleUrl, body, this.cudOptions)
            .toPromise()
            .then(response => {
                // success response is empty
                const responseBody = response.json();
                return responseBody || {};
            })
            .catch(this.handlerError);
    }

    deletePerson(id: number): Promise<Response> {
        const url = `${this.peopleUrl}/${id}`;
        return this.http
            .delete(url, this.cudOptions)
            .toPromise()
            .then(response => {
                const body = response.json();
                return body || {};
            })
            .catch(this.handlerError);
    }

    getNewPerson(): Promise<Person> {
        return new Promise<Person>(resolve => {
            resolve(this.initializePerson());
        });
    }

    private initializePerson(): Person {
        return new Person('assets/fileupload.png', undefined, undefined, undefined, undefined, 0, false);
    }

    getPeople(): Promise<Person[]> {
        return this.http
            .get(this.peopleUrl)
            .toPromise()
            .then(response => {
                return response.json().map(item => {
                    return new Person(item.image, item.name, item.id, item.birthdata, item.gender, item.userRank, item.isAdmin);
                });
            })
            .catch(this.handlerError);
    }

    getPerson(id: number): Promise<Person> {
        const url = `${this.peopleUrl}/${id}`;
        return this.http
            .get(url)
            .toPromise()
            .then(response => {
                const item = response.json();
                return new Person(item.image, item.name, item.id, item.birthdate, item.gender, item.userRank, item.isAdmin);
            })
            .catch(this.handlerError);

    }

    private handlerError(error: Error): Promise<any> {
        return Promise.reject(error);
    }
}
