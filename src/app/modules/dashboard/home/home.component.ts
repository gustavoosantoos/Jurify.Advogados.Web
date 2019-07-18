import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  token: string;

  constructor(
    private authService: AuthenticationService
  ) { }

  async ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.token = this.authService.getToken();
    } else {
      if (await this.authService.authenticate('gustavo', 'gustavo')) {
        this.token = this.authService.getToken();
      }
    }
  }
}