import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        DashboardRoutingModule,
        CommonModule
    ],
    exports: [],
    providers: [],
})
export class DashboardModule { }
