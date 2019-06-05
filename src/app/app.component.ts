import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jurify-web';

  toggleMenu(): void {
    const menu = document.getElementById('sidemenu');
    const button = document.getElementsByClassName('togglemenu');
    console.log(button);

    if (button[0].classList.contains('open')) {
      button[0].classList.remove('open');
      button[0].classList.add('closed');
      menu.style.marginLeft = '-7%';
    } else if (button[0].classList.contains('closed')) {
      button[0].classList.remove('closed');
      button[0].classList.add('open');
      menu.style.marginLeft = '0';
    }
  }
}
