import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Especialidade } from 'src/app/shared/model/especialidade.model';
import { MatSnackBar } from '@angular/material';
import { EspecialidadeResult } from 'src/app/shared/model/especialidade-result.model';
import { Escritorio } from 'src/app/shared/model/escritorio.model';
import { EscritorioAtualizacao } from 'src/app/shared/model/escritorio-atualizacao.model';

@Component({
  selector: 'app-editar-escritorio',
  templateUrl: './editar-escritorio.component.html',
  styleUrls: ['./editar-escritorio.component.scss']
})
export class EditarEscritorioComponent implements OnInit {
  selected;


  constructor(
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) { }

  selected;
  escritorio: Escritorio;
  especialidades: Especialidade[];
  minhasEspecialidades: Especialidade[];

  ngOnInit() {
    this.getInfoEscritorio();
    this.getEspecialidades();
    this.getEspecialidadesEsc();
  }

  getInfoEscritorio() {
    this.authService.getInfoEscritorio().subscribe(e => {
      this.escritorio = e;
    })
  }

  getEspecialidades() {
    this.authService.getEspecialidades().subscribe(e => {
      this.especialidades = e;
    });
  }

  salvarEspecialidade(especialidade) {
    if (this.authService.salvarEspecialidade(especialidade)) {
      this.snackBar.open('Especialidade adicionada com sucesso', 'Fechar', {
        duration: 5000
      });
    } else {
      this.snackBar.open('Falha em adicionar a especialidade', 'Fechar', {
        duration: 5000
      });
    }
  }

  getEspecialidadesEsc() {
    this.authService.getEspecialidadesEscritorio().subscribe(e => {
      this.minhasEspecialidades = e.result;
    });
  }

  removerEspecialidade(codigo) {
    if (this.authService.removerEspecialidade(codigo)) {
      document.querySelector('#' + codigo).remove();
    };
  }

  atualizarDados() {
    const endereco = {
      "cep": this.escritorio.endereco.cep,
      "rua": this.escritorio.endereco.rua,
      "numero": this.escritorio.endereco.numero,
      "bairro": this.escritorio.endereco.bairro,
      "cidade": this.escritorio.endereco.cidade,
      "estado": this.escritorio.endereco.estado,
      "complemento": this.escritorio.endereco.complemento
    };

    const escritorioAtualizacao = new EscritorioAtualizacao(
      this.escritorio.informacoes.razaoSocial,
      this.escritorio.informacoes.nomeFantasia,
      this.escritorio.informacoes.cnpj,
      endereco
    );

    this.authService.atualizarDados(escritorioAtualizacao).subscribe(e => {
      this.snackBar.open('Dados atualizados com sucesso', 'Fechar', {
        duration: 5000
      });

    }, error => {
      this.snackBar.open('Erro ao atualizar os dados', 'Fechar', {
        duration: 5000
      });
    });
  }
}
