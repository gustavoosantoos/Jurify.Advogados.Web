import { required, prop } from '@rxweb/reactive-form-validators';

export class NovoCompromisso {
    @required()
    public titulo: string;

    public descricao: string;
    public inicio: Date;
    public final: Date;
    public codigoCliente: string;

    @prop()
    public horaInicio: string;

    @prop()
    public horaFinal: string;

    public atualizarHorarioCompromisso(): void {
        if (this.horaInicio) {
            this.inicio.setUTCHours(
                parseInt(this.horaInicio.substring(0, 2), 10),
                parseInt(this.horaInicio.substring(3, 5), 10)
            );
        } else {
            this.inicio.setUTCHours(0, 0, 0);
        }

        if (this.horaFinal) {
            this.final = new Date(this.inicio.getTime());
            this.final.setUTCHours(
                parseInt(this.horaFinal.substring(0, 2), 10),
                parseInt(this.horaFinal.substring(3, 5), 10)
            );
        }
    }
}
