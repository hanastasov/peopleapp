import { Component, OnInit } from '@angular/core';
import { PubSubService } from '../../shared/pub-sub.service';

@Component({
    selector: 'app-sales-dashboard',
    templateUrl: './sales-dashboard.component.html',
    styleUrls: ['./sales-dashboard.component.scss']
})
export class SalesDashboardComponent implements OnInit {

    dashboardImageSource: string;
    constructor(private pubSubService: PubSubService) { }

    ngOnInit() {
        this.pubSubService.showAddButton(false);
        this.pubSubService.setTitle('Sales');
        if (window.screen.width < 516) {
            this.dashboardImageSource = 'dashboard91Wide.png';
        } else if (window.screen.width < 829) {
            this.dashboardImageSource = 'dashboard516Wide.png';
        } else {
            this.dashboardImageSource = 'dashboard829Wide.jpg';
        }

    }

}
