import { Component, OnInit } from '@angular/core';
import { ProcessosJuridicosService } from '../../services/processos-juridicos.service';
import { NovoProcesso } from '../../model/cadastro/novo-processo.model';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.scss']
})
export class VisualizacaoComponent implements OnInit {

  constructor(
    private processoService: ProcessosJuridicosService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingScreenService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  codigoProcesso: string;
  processo: NovoProcesso;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(r => {
      this.codigoProcesso = r.get('codigo');
      this.getProcesso();
    });
  }

  getProcesso(): void {
    this.loadingService.isLoading.next(true);
    this.processoService.obterProcesso(this.codigoProcesso).subscribe(p => {
      this.processo = p;
      console.log(this.processo);
      
      this.loadingService.isLoading.next(false);
    }, error => {
      this.loadingService.isLoading.next(false);
      this.snackBar.open('Erro ao carregar cliente', 'Fechar', { duration: 10000 });
      this.router.navigateByUrl('/clientes');
    });
  }

}
