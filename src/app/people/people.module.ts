import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PeopleDetailsComponent } from './people-details/people-details.component';
import { PeopleEditComponent } from './people-edit/people-edit.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleShellComponent } from './people-shell/people-shell.component';
import { SharedModule } from '../shared/shared.module';
import { PeopleService } from './people.service';
import { PeopleResolverService } from './people-resolver.service';
import { PersonResolverService } from './person-resolver.service';
import { PeopleEditGuardService } from './people-edit-guard.service';
import { AppErrorHandler } from '../app-error-handler';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: 'people',
                component: PeopleShellComponent,
                resolve: { people: PeopleResolverService },
                children: [
                    {
                        path: 'add',
                        component: PeopleEditComponent,
                        resolve: { person: PersonResolverService }
                    },
                    {
                        path: 'edit/:id',
                        component: PeopleEditComponent,
                        resolve: { person: PersonResolverService },
                        canDeactivate: [PeopleEditGuardService],
                    },
                    {
                        path: 'details/:id',
                        component: PeopleDetailsComponent,
                        resolve: { person: PersonResolverService }
                    }
                ]
            }
        ])
    ],
    providers: [
        PeopleResolverService,
        PersonResolverService,
        PeopleService,
        PeopleEditGuardService,
        AppErrorHandler
    ],
    declarations: [
        PeopleDetailsComponent,
        PeopleEditComponent,
        PeopleListComponent,
        PeopleShellComponent]
})

export class PeopleModule { }
