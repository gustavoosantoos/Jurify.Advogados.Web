import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { UsuariosService } from 'src/app/modules/usuarios/services/usuarios.service';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import { CadastroUsuario } from 'src/app/modules/usuarios/model/usuario.model';
import { filter } from 'minimatch';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {

  isLoading = false;
  usuarios: CadastroUsuario[];
  UsuarioRemocao: CadastroUsuario;
  dataSource: MatTableDataSource<CadastroUsuario> = new MatTableDataSource([]);
  displayedColumns: string[] = ['numeroOab', 'estado', 'primeiroNome', 'email', 'ehAdministrador', 'acoes'];
  value = '';

  @ViewChild('templateRemocaoUsuario', { static: true })
  templateRemocaoUsuario: TemplateRef<any>;

  constructor(
    private UsuarioService: UsuariosService,
    private loadingService: LoadingScreenService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit() {
    this.loadingService.isLoading.subscribe(r => this.isLoading = r);
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.loadingService.isLoading.next(true);
    this.UsuarioService.getUsuarios()
      .subscribe(usuarios => {
        this.usuarios = usuarios;
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.loadingService.isLoading.next(false);
      }, error => {
          this.usuarios = [];
          this.dataSource = new MatTableDataSource(this.usuarios);
        this.loadingService.isLoading.next(false);
      });
  }
  removerUsuario(Usuario: CadastroUsuario) {
    this.UsuarioRemocao = Usuario;
    this.dialog.open(this.templateRemocaoUsuario);
  }

  cancelarRemocao() {
    this.UsuarioRemocao = null;
    this.dialog.closeAll();
  }

  confirmarRemocao() {
    this.loadingService.isLoading.next(true);
    this.dialog.closeAll();

    this.UsuarioService.removerUsuario(this.UsuarioRemocao.codigoUsuario).subscribe(r => {
      this.UsuarioRemocao = null;
      this.loadingService.isLoading.next(false);
      this.getUsuarios();
    }, error => {
      this.UsuarioRemocao = null;
      this.loadingService.isLoading.next(false);
      this.snackBar.open('Erro ao remover Usuario', 'Fechar', {
        duration: 10000
      });
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    filterValue = filterValue.replace('/', '-');

    this.dataSource.filter = filterValue;
  }


}
