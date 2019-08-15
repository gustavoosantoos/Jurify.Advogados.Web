import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import Cliente from '../../model/visualizacao/cliente';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.scss']
})
export class VisualizacaoComponent implements OnInit {
  public cliente: Cliente;

  constructor(
    private clientesService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingScreenService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(r => {
      this.loadingService.isLoading.next(true);
      const codigoCliente = r.get('codigo');
      const snackBarConfig = new MatSnackBarConfig();
      snackBarConfig.duration = 10000;

      this.clientesService.getCliente(codigoCliente).subscribe(c => {
        this.cliente = c;
        this.loadingService.isLoading.next(false);
      }, error => {
        this.loadingService.isLoading.next(false);        
        this.snackBar.open('Erro ao carregar cliente', 'Fechar', snackBarConfig);
        this.router.navigateByUrl('/clientes');
      });
    });
  }
}
