import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';

library.add(fas);

@NgModule({
    declarations: [MenuLateralComponent],
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    exports: [
        MenuLateralComponent,
    ],
    providers: [],
})
export class CoreModule { }
