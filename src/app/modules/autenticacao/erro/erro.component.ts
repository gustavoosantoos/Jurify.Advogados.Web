import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ErroComponent implements OnInit {
  public codigo: number;
  public mensagem: string;

  constructor(
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      this.codigo = params.codigo;
      this.mensagem = params.mensagem;
    });
  }
}
