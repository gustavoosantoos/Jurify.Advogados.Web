import { zip } from 'rxjs';
import { CadastrosService } from './../../../../shared/services/cadastros.service';
import { Component, OnInit } from '@angular/core';
import { ProcessosJuridicosService } from '../../services/processos-juridicos.service';
import Cliente from '../../model/cadastro/cliente.model';
import EstadoBrasileiro from 'src/app/shared/model/estado-brasileiro.model';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import { MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { NovoProcesso } from '../../model/cadastro/novo-processo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  isLoading = true;

  clientes: Cliente[] = [];
  estadosBrasileiros: EstadoBrasileiro[] = [];

  novoProcessoFormGroup: FormGroup;
  novoProcesso: NovoProcesso;

  constructor(
    private processosService: ProcessosJuridicosService,
    private cadastrosService: CadastrosService,
    private loadingService: LoadingScreenService,
    private snackBar: MatSnackBar,
    private formBuilder: RxFormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadingService.isLoading.subscribe(r => this.isLoading = r);
    this.carregarDados();
  }

  carregarDados(): void {
    this.loadingService.isLoading.next(true);

    // Combina as chamadas de api para deixar o loading correto dos dois observables
    zip(
      this.processosService.obterClientesDisponiveis(),
      this.cadastrosService.obterEstadosBrasileiros())
    .subscribe(([clientes, estados]) => {
      // Após ter o resultado das chamadas de api, inicializa o formulário
      this.clientes = clientes;
      this.estadosBrasileiros = estados;
      this.inicializaFormulario();
    }, err => {
      // Captura e exibe feedback de erro
      this.snackBar.open('Erro ao carregar dados', 'Fechar');
    }, () => {
      // Em qualquer um dos dois casos acima, tira a tela de loading
      this.loadingService.isLoading.next(false);
    });
  }

  voltar(): void {

  }

  salvarProcesso(): void {
    // TO-DO: Verificar porque não está vinculando o form ao objeto
    console.log(this.novoProcesso);
    console.log(this.novoProcessoFormGroup.value);

    if (this.novoProcessoFormGroup.invalid) {
      this.snackBar.open('Dados inválidos', 'Fechar');
      return;
    }

    this.loadingService.isLoading.next(true);

    this.processosService.salvarProcesso(this.novoProcesso).subscribe(r => {
      this.novoProcesso = new NovoProcesso();
      this.router.navigateByUrl('/processos');
    }, err => {
      this.snackBar.open('Falha ao cadastrar processo', 'Fechar');
    }, () => {
      this.loadingService.isLoading.next(false);
    });
  }

  private inicializaFormulario(): void {
    this.novoProcesso = new NovoProcesso();
    this.novoProcessoFormGroup = this.formBuilder.formGroup(this.novoProcesso);
  }
}
