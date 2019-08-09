import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.scss']
})
export class MenuSuperiorComponent implements OnInit {

  showLogo = false;

  @Output()
  public toggleMenu = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {

  }

  toggleSidenav() {
    this.toggleMenu.emit();
    this.showLogo = !this.showLogo;
  }
}
