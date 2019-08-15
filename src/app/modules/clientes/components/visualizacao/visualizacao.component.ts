import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import Cliente from '../../model/visualizacao/cliente';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.scss']
})
export class VisualizacaoComponent implements OnInit {
  public cliente: Cliente = new Cliente();

  constructor(
    private clientesService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(r => {
      const snackBarConfig = new MatSnackBarConfig();
      snackBarConfig.duration = 10000;

      const codigoCliente = r.get('codigo');
      this.clientesService.getCliente(codigoCliente).subscribe(c => {
        this.cliente = c;
      }, error => {
        this.snackBar.open('Erro ao carregar cliente', 'Fechar', snackBarConfig);
        this.router.navigateByUrl('/clientes');
      });
    });
  }
}
