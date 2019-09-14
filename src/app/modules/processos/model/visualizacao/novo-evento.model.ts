import { required } from '@rxweb/reactive-form-validators';
import { Time } from '@angular/common';

export class NovoEvento {
    public codigoProcessoJuridico: string;

    @required()
    public descricao: string;

    @required()
    public dataEvento: Date;

    @required()
    public horaEvento: string;

    @required()
    public adicionarNaAgenda: boolean;

    public dataHoraEvento;

    public atualizarDataHoraEvento(): void {
        this.dataHoraEvento = `${new Date(this.dataEvento).toLocaleDateString()} ${this.horaEvento.toString()}`;
    }
}
