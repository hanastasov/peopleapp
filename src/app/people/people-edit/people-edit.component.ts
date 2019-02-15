import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { merge as observableMerge, fromEvent as observableFromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { PeopleService } from '../people.service';
import { PubSubService } from '../../shared/pub-sub.service';
import { Person } from '../person';
import { Gender } from '../gender';
import { UtilityService } from '../../shared/utility-service';
import { DateValidators } from '../../shared/date-validators';
import { GenericValidator } from '../../shared/generic-validator';
import { AppErrorHandler } from '../../app-error-handler';

@Component({
    selector: 'app-people-edit',
    templateUrl: './people-edit.component.html',
    styleUrls: ['./people-edit.component.scss']
})
export class PeopleEditComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    gender = Gender;
    personForm: FormGroup;
    person: Person;
    genderKeys: string[];
    maximumBirthdate: Date = new Date();
    private valueChangesSubscription: Subscription;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    constructor(private peopleService: PeopleService,
        private pubSubService: PubSubService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private utilityService: UtilityService,
        private errorHandler: AppErrorHandler) {

        this.validationMessages = {
            name: {
                required: 'Name is required.',
                minlength: 'Name must be at least three characters.',
                maxlength: 'Name cannot exceed 50 characters.'
            },
            birthdate: {
                required: 'Birthday is required.',
                maximumDate: 'Birthday must be today or earlier.'
            },
            image: {
                required: 'Image selection is required.'
            },
            gender: {
                required: 'Gender selection is required.'
            }
        };

        // Define an instance of the validator for use with this form,
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    onPersonRetrieved() {
        if (this.person.id) {
            this.pubSubService.setTitle(`Editing ${this.person.name}`);
        } else {
            this.pubSubService.setTitle('Adding Person');
            this.pubSubService.showAddButton(false);
        }

        if (this.personForm) {
            this.personForm.patchValue({
                name: this.person.name,
                birthdate: new Date(this.person.birthdate),
                image: this.person.image,
                gender: this.person.gender !== undefined ? this.person.gender.toString() : undefined,
                userRank: this.person.userRank,
                isAdmin: this.person.isAdmin
            });
        }
    }

    avatarClicked() {
        alert('clicked');
    }

    onDialogOKSelected(event: any) {
        event.dialog.close();
        this.deletePerson();
    }

    onFileSelected(input: HTMLInputElement): void {
        if (!input.value) {
            return;
        }

        const reader: FileReader = new FileReader();
        reader.onloadend = () => {
            this.person.image = reader.result;
            this.personForm.patchValue({
                image: this.person.image
            });
        };

        reader.readAsDataURL(input.files[0]);
    }

    deletePerson() {
        this.peopleService.deletePerson(this.person.id)
            .then(result => {
                // the result will be undefined if an error has occured.
                // if error, then do nothing, since the service already redirected to the error page.
                if (result) {
                    this.personForm.markAsPristine();
                    this.pubSubService.showToast(`${this.person.name} deleted.`);
                    this.pubSubService.personCollectionUpdated();
                }
            })
            .catch(error => {
                this.errorHandler.handleErrorPlus('Error deleting person.', error);
            });
    }

    onSaveClicked() {
        if (this.personForm.valid) {

            // Copy the form values over the product object values
            const person = Object.assign({}, this.person, this.personForm.value);
            this.peopleService.savePerson(person)
                .then(result => {
                    // the result will be undefined if an error has occured.
                    // if error, then do nothing, since the service already redirected to the error page.
                    if (result) {
                        this.personForm.markAsPristine();
                        this.pubSubService.showToast(`${person.name} saved.`);
                        this.pubSubService.personCollectionUpdated();
                    }
                })
                .catch(error => {
                    this.errorHandler.handleErrorPlus('Error saving person.', error);
                });
        } else {
            this.utilityService.validateAllFormFields(this.personForm);
            this.displayMessage = this.genericValidator.processMessages(this.personForm);
        }
    }

    ngOnInit(): void {
        this.personForm = this.formBuilder.group({
            name: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            birthdate: [undefined, [Validators.required, DateValidators.maximumDate(moment().toDate())]],
            image: [undefined, Validators.required],
            gender: [undefined, Validators.required],
            userRank: 0,
            isAdmin: false
        });

        this.genderKeys = this.utilityService.enumToKeyValues(Gender);
        this.route.data.subscribe(data => {
            if (this.personForm) {
                this.personForm.reset();
                this.personForm.markAsPristine();
            }
            this.person = data['person'];
            this.onPersonRetrieved();
        });
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => observableFromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        this.valueChangesSubscription =
            observableMerge(this.personForm.valueChanges, ...controlBlurs).pipe(debounceTime(800)).subscribe(value => {
                this.displayMessage = this.genericValidator.processMessages(this.personForm);
            });
    }

    ngOnDestroy(): void {
        this.valueChangesSubscription.unsubscribe();
    }
}
