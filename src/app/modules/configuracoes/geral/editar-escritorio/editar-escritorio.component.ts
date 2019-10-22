import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Especialidade } from 'src/app/shared/model/especialidade.model';
import { MatSnackBar } from '@angular/material';
import { EspecialidadeResult } from 'src/app/shared/model/especialidade-result.model';

@Component({
  selector: 'app-editar-escritorio',
  templateUrl: './editar-escritorio.component.html',
  styleUrls: ['./editar-escritorio.component.scss']
})
export class EditarEscritorioComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) { }

  especialidades: Especialidade[];
  minhasEspecialidades: Especialidade[];

  ngOnInit() {
    this.getEspecialidades();
    this.getEspecialidadesEsc();
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
}
