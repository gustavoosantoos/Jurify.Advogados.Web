import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { UsuariosService } from 'src/app/modules/Usuarios/services/Usuarios.service';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';
import UsuarioPreview from 'src/app/modules/usuarios/model/usuario.model';
import { filter } from 'minimatch';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {

  isLoading = false;
  usuarios: UsuarioPreview[];
  UsuarioRemocao: UsuarioPreview;
  dataSource: MatTableDataSource<UsuarioPreview> = new MatTableDataSource([]);
  displayedColumns: string[] = ['nome', 'email', 'nascimento', 'acoes'];
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    filterValue = filterValue.replace('/', '-');

    this.dataSource.filter = filterValue;
  }


}
