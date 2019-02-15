import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export class DateValidators {

    static maximumDate(maxDate: any): ValidatorFn {

        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (!maxDate) {
                return null;
            }
            const maxDateResolved = moment(maxDate, 'MM-DD-YYYY', true);

            if (!maxDateResolved.isValid()) {
                throw Error('maxDate is not a valid date.');
            }

            if (!c.value) {
                return null;
            }

            const controlDateResolved = moment(c.value);
            if (!controlDateResolved.isValid()) {
                return { maximumDate: true };
            }

            const today = moment(new Date());

            if (controlDateResolved.isAfter(today, 'day')) {
                return { maximumDate: true };
            } else {
                return null;
            }
        };
    }
}
