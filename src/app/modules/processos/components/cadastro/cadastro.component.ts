import { zip } from 'rxjs';
import { CadastrosService } from './../../../../shared/services/cadastros.service';
import { Component, OnInit } from '@angular/core';
import { ProcessosJuridicosService } from '../../services/processos-juridicos.service';
import Cliente from '../../model/cadastro/cliente.model';
import EstadoBrasileiro from 'src/app/shared/model/estado-brasileiro.model';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  clientes: Cliente[] = [];
  estadosBrasileiros: EstadoBrasileiro[] = [];

  constructor(
    private processosService: ProcessosJuridicosService,
    private cadastrosService: CadastrosService,
    private loadingService: LoadingScreenService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados(): void {
    this.loadingService.isLoading.next(true);

    // Combina as chamadas de api para deixar o loading correto dos dois observables
    zip(this.processosService.obterClientesDisponiveis(), this.cadastrosService.obterEstadosBrasileiros())
    .subscribe(results => {
      this.clientes = results[0];
      this.estadosBrasileiros = results[1];
    }, err => {
      this.snackBar.open('Erro ao carregar dados', 'Fechar');
    }, () => {
      this.loadingService.isLoading.next(false);
    });
  }
}
