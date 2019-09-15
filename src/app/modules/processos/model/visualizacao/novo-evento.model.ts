import { required, prop } from '@rxweb/reactive-form-validators';
import { Time } from '@angular/common';

export class NovoEvento {
    public codigoProcessoJuridico: string;

    @required()
    public titulo: string;

    @prop()
    public descricao: string;

    @required()
    public dataEvento: Date;

    @required()
    public horaEvento: string;

    @required()
    public adicionarNaAgenda: boolean;

    public dataHoraEvento: Date;

    public atualizarDataHoraEvento(): void {
        this.dataEvento.setUTCHours(
            parseInt(this.horaEvento.substring(0, 2), 10),
            parseInt(this.horaEvento.substring(3, 5), 10)
        );

        this.dataHoraEvento = this.dataEvento;
    }
}
