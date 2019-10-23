import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.component.html',
  styleUrls: ['./geral.component.scss']
})
export class GeralComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

  }
}
