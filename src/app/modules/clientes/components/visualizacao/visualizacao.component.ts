import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import Cliente from '../../model/visualizacao/cliente';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import ClienteAtualizacao from '../../model/atualizacao/cliente-atualizacao.model';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.scss']
})
export class VisualizacaoComponent implements OnInit {
  public cliente: Cliente;
  public codigoCliente: string;

  constructor(
    private clientesService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingScreenService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(r => {
      this.codigoCliente = r.get('codigo');
      this.getCliente();
    });
  }

  getCliente() {
    this.loadingService.isLoading.next(true);
    this.clientesService.getCliente(this.codigoCliente).subscribe(c => {
      this.cliente = c;
      this.loadingService.isLoading.next(false);
    }, error => {
      this.loadingService.isLoading.next(false);        
      this.snackBar.open('Erro ao carregar cliente', 'Fechar', { duration: 10000 });
      this.router.navigateByUrl('/clientes');
    });
  }

  atualizarDadosBasicos() {
    const clienteAtualizacao = new ClienteAtualizacao(
      this.codigoCliente,
      this.cliente.nome,
      this.cliente.sobrenome,
      this.cliente.rg,
      this.cliente.cpf,
      this.cliente.email,
      this.cliente.dataNascimento
    );

    this.clientesService.atualizarDadosBasicosCliente(clienteAtualizacao).subscribe(r => {
      this.loadingService.isLoading.next(true);

      if (r == clienteAtualizacao.codigo) {
        this.loadingService.isLoading.next(false);        
        this.snackBar.open('Cliente atualizado com sucesso', 'Fechar', { duration: 10000 });
        this.getCliente();
      } else {
        this.loadingService.isLoading.next(false);        
        this.snackBar.open('Erro ao atualizar cliente', 'Fechar', { duration: 10000 });
      }
    });
  }
}
