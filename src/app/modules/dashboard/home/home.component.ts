import { DashboardService } from './../../../shared/services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Dashboard } from 'src/app/shared/model/dashboard.model';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public dados: Dashboard;

  constructor(
    private dashboard: DashboardService,
    private loading: LoadingScreenService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loading.isLoading.next(true);
    this.dashboard.obterDados().subscribe(d => {
      this.dados = d;
    }, err => {
      this.snackBar.open('Falha ao obter dados', 'Fechar');
    }, () => {
      this.loading.isLoading.next(false);
    });
  }
}
