import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PubSubService } from '../shared/pub-sub.service';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
    message: any;
    errorObject: any;

    constructor(private route: ActivatedRoute, private pubSubService: PubSubService) { }

    ngOnInit() {
        this.pubSubService.setTitle('Application Error');
        this.pubSubService.showAddButton(false);
        this.message = this.route.snapshot.queryParams['error'] || 'error not passed';
        this.errorObject = this.route.snapshot.queryParams['errorObject'] || 'no error object passed';
    }

}
