import { required } from '@rxweb/reactive-form-validators';

export class Endereco {
    @required()
    public cep: string;

    @required()
    public rua: string;

    @required()
    public numero: string;

    @required()
    public bairro: string;

    @required()
    public cidade: string;

    @required()
    public estado: string;

    public complemento: string;
}
