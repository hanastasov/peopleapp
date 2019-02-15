import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataServiceService } from './mock-data-service.service';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MatDatepickerModule, MatInputModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material';

import {
  IgxAvatarModule,
  IgxBadgeModule,
  IgxButtonModule,
  IgxCheckboxModule,
  IgxDatePickerModule,
  IgxDialogModule,
  IgxIconModule,
  IgxInputGroupModule,
  IgxListModule,
  IgxNavbarModule,
  IgxNavigationDrawerModule,
  IgxProgressBarModule,
  IgxRadioModule,
  IgxRippleModule,
  IgxForOfModule,
  IgxSliderModule,
  IgxSwitchModule,
  IgxToastModule
} from 'igniteui-angular';

import 'hammerjs';
import { PubSubService } from './pub-sub.service';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { UtilityService } from './utility-service';

@NgModule({
    declarations: [
        FileUploadComponent
    ],
    imports: [
        CommonModule,
        InMemoryWebApiModule.forRoot(MockDataServiceService, { delay: 250 }),
        HttpModule,
        IgxAvatarModule,
        IgxBadgeModule,
        IgxButtonModule,
        IgxCheckboxModule,
        IgxDatePickerModule,
        IgxDialogModule,
        IgxIconModule,
        IgxInputGroupModule,
        IgxListModule,
        IgxNavbarModule,
        IgxNavigationDrawerModule,
        IgxProgressBarModule,
        IgxRadioModule,
        IgxRippleModule,
        IgxForOfModule,
        IgxSliderModule,
        IgxSwitchModule,
        IgxToastModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule
    ],
    providers: [
        PubSubService,
        UtilityService
    ],
    exports: [
        CommonModule,
        HttpModule,
        IgxAvatarModule,
        IgxBadgeModule,
        IgxButtonModule,
        IgxCheckboxModule,
        IgxDatePickerModule,
        IgxDialogModule,
        IgxIconModule,
        IgxInputGroupModule,
        IgxListModule,
        IgxNavbarModule,
        IgxNavigationDrawerModule,
        IgxProgressBarModule,
        IgxRadioModule,
        IgxRippleModule,
        IgxForOfModule,
        IgxSliderModule,
        IgxSwitchModule,
        IgxToastModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        FileUploadComponent
    ]
})
export class SharedModule { }
