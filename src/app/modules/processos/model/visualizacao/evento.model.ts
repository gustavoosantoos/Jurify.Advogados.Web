import { required } from '@rxweb/reactive-form-validators';

export class Evento {
    codigoProcessoJuridico: string;

    @required()
    descricao: string;
}