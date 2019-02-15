import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { PeopleModule } from './people/people.module';
import { SalesModule } from './sales/sales.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AppErrorHandler } from './app-error-handler';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        ErrorPageComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        PeopleModule,
        SalesModule,
        RouterModule.forRoot([
            { path: 'pagenotfound', component: PageNotFoundComponent },
            { path: 'error', component: ErrorPageComponent },
            { path: '', redirectTo: 'people', pathMatch: 'full' },
            { path: '**', redirectTo: 'pagenotfound' }
        ]),
    ],
    providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }],
    bootstrap: [AppComponent]
})
export class AppModule { }
