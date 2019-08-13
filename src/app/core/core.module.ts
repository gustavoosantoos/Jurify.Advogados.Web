import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { SharedModule } from '../shared/shared.module';
import { MenuSuperiorComponent } from './components/menu-superior/menu-superior.component';
import { MatToolbarModule, MatSidenavModule, MatMenuModule } from '@angular/material';

library.add(fas);

@NgModule({
    declarations: [
        MenuLateralComponent,
        MenuSuperiorComponent
    ],
    imports: [
        SharedModule,
        FontAwesomeModule,
        MatToolbarModule,
        MatSidenavModule,
        MatMenuModule
    ],
    exports: [
        MenuLateralComponent,
        MenuSuperiorComponent
    ],
    providers: [],
})
export class CoreModule { }
