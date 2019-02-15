import { NgModule } from '@angular/core';
import { SalesDashboardComponent } from './sales-dashboard/sales-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterModule } from '@angular/router';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'sales', component: SalesDashboardComponent }
        ])
    ],
    declarations: [SalesDashboardComponent]
})
export class SalesModule { }
