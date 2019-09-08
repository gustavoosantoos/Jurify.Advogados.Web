import { required, maxLength, prop } from '@rxweb/reactive-form-validators';

export class NovoProcesso {
    @required()
    codigoCliente: string;

    codigoAdvogadoResponsavel: string;

    @required()
    @maxLength({ value: 30 })
    numeroProcesso: string;

    @prop()
    juizResponsavel: string;

    @required()
    codigoUF: number;

    @required()
    @maxLength({ value: 100 })
    titulo: string;

    @required()
    @maxLength({ value: 3000 })
    descricao: string;

    @required()
    status: number;

    @required()
    tipoDePapel: number;
}
