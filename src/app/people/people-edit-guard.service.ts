import { Injectable } from '@angular/core';
import { PeopleEditComponent } from './people-edit/people-edit.component';
import { CanDeactivate } from '@angular/router';

@Injectable()
export class PeopleEditGuardService implements CanDeactivate<PeopleEditComponent> {

    canDeactivate(component: PeopleEditComponent): boolean {
        if (component.personForm.dirty) {
            const name = component.personForm.get('name').value || 'New Person';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }

}
