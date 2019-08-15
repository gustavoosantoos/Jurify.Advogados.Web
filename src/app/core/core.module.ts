import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { SharedModule } from '../shared/shared.module';
import { MenuSuperiorComponent } from './components/menu-superior/menu-superior.component';
import { MatToolbarModule, MatSidenavModule, MatMenuModule } from '@angular/material';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';

library.add(fas);

@NgModule({
    declarations: [
        MenuLateralComponent,
        MenuSuperiorComponent,
        LoadingScreenComponent
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
        MenuSuperiorComponent,
        LoadingScreenComponent
    ],
    providers: [],
})
export class CoreModule { }
