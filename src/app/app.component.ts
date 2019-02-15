import { Component, ViewChild, OnDestroy } from '@angular/core';
import {
    Router,
    Event,
    NavigationExtras,
    NavigationEnd,
    NavigationStart,
    NavigationError,
    NavigationCancel
} from '@angular/router';

import { PubSubService } from './shared/pub-sub.service';
import { IgxToastComponent } from 'igniteui-angular';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

    title: String;
    open: boolean = false;
    position = 'left';
    drawerMiniWidth = '';
    navigationInProgress: boolean = true;
    showAddButton: boolean;
    private toastRequested: Subscription;
    private setTitleRequested: Subscription;
    private showAddButtonRequested: Subscription;

    @ViewChild('toast') toast: IgxToastComponent;

    public navigationItems: Array<{
        icon: string,
        text: string,
        link: string
    }> = [];

    constructor(private router: Router, private pubSubService: PubSubService) {
        this.navigationItems.push({ icon: 'people.png', text: 'People', link: '/people' });
        this.navigationItems.push({ icon: 'sales.png', text: 'Sales', link: '/sales' });

        router.events.subscribe((routerEvent: Event) => {
            this.processRouterEvent(routerEvent);
        });

        this.toastRequested = this.pubSubService.toastRequested$.subscribe((toastMessage) => {
            this.toast.message = toastMessage;
            this.toast.show();
        });

        this.setTitleRequested = this.pubSubService.setTitleRequested$.subscribe((titletext) => {
            setTimeout(() => {
                this.title = titletext;
            });
        });

        this.showAddButtonRequested = this.pubSubService.showAddButtonRequested$.subscribe((showAddButton) => {
            setTimeout(() => {
                this.showAddButton = showAddButton;
            });
        });
    }

    ngOnDestroy(): void {
        this.toastRequested.unsubscribe();
        this.setTitleRequested.unsubscribe();
        this.showAddButtonRequested.unsubscribe();
    }

    onAddClicked() {
        this.pubSubService.addRequested();
    }

    private processRouterEvent(routerEvent: Event): void {
        if (routerEvent instanceof NavigationStart) {
            this.navigationInProgress = true;
            this.showAddButton = true;
            return;
        }
        if (routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError) {

            setTimeout(() => {
                this.navigationInProgress = false;
            });

            if (routerEvent instanceof NavigationError) {
                const navigationExtras: NavigationExtras = {
                    queryParams: { error: 'App Component handled uncaught NavigationError', errorObject: routerEvent.error.message }
                };

                this.router.navigate(['/error'], navigationExtras);
            }
        }
    }
}
