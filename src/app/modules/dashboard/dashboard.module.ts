import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        SharedModule,
        DashboardRoutingModule
    ],
    exports: [],
    providers: [],
})
export class DashboardModule { }
