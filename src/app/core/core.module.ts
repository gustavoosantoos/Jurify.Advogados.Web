import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { SharedModule } from '../shared/shared.module';

library.add(fas);

@NgModule({
    declarations: [MenuLateralComponent],
    imports: [
        SharedModule,
        FontAwesomeModule
    ],
    exports: [
        MenuLateralComponent,
    ],
    providers: [],
})
export class CoreModule { }
