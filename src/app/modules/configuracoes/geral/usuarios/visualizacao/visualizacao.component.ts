import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UsuarioModel } from 'src/app/shared/model/usuario.model';
import { UsuarioAtualizacao } from 'src/app/shared/model/usuario-atualizacao.model';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrls: ['./visualizacao.component.scss']
})
export class VisualizacaoComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snakBar: MatSnackBar
  ) { }

  codigoUser: string;
  usuario: UsuarioModel;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(r => {
      this.codigoUser = r.get('codigo');
      this.getUsuario();
    });
  }

  getUsuario() {
    this.authService.getUsuario(this.codigoUser).subscribe(u => {
      this.usuario = u;
      console.log(this.usuario.permissoes[0].valor);
    },
    error => {
      this.snakBar.open('Erro ao obter os dados do usuário', 'Fechar', {
        duration: 5000
      });
    });
  }

  atualizarDadosUsuario() {
    let usuario = {
      "codigoUsuario": this.usuario.codigo,
      "codigoEscritorio": this.usuario.codigoEscritorio,
      "nome": this.usuario.informacoesPessoais.primeiroNome,
      "sobrenome": this.usuario.informacoesPessoais.ultimoNome,
      "email": this.usuario.username,
      "senha": this.usuario.senha,
      "estado": this.usuario.credenciais.estado.codigo,
      "numeroOAB": this.usuario.credenciais.numeroOab,
      "ehAdministrador": this.usuario.permissoes.valor
    };
    let usuarioAtualizacao = new UsuarioAtualizacao(
      usuario
    );

    this.authService.atualizarUsuario(usuarioAtualizacao).subscribe(r => {
      if(r) {
        this.snakBar.open('Dados atualizados com sucesso', 'Fechar', {
          duration: 5000
        });
      }
    }, error => {
      this.snakBar.open('Erro ao atualizar os dados', 'Fechar', {
        duration: 5000
      });
    })
  }

}
