import { Injectable } from '@angular/core';
import { isNumeric } from 'rxjs/util/isNumeric';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable()
export class UtilityService {

    /**
     * Reads the enum values, creates an object array with value and title.
     * @param  {Object} definition
     * @returns Object[], the object is { key, title, value }
     * Where key is the numeric enum value, title it enum name, value is the string value of the enum value
     */
    public enumToKeyValues(definition: Object): string[] {

        return Object.keys(definition).filter((value, index) => {
            return isNumeric(value);
        });

    }
    /** Marks all child FormGroup controls as touched to trigger their validation rule.
     * @param  {FormGroup} formGroup
     */
    public validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

}
