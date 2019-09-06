import { Endereco } from './endereco-signup';
import { required } from '@rxweb/reactive-form-validators';

export class Escritorio {
    @required()
    public razaoSocial: string;

    @required()
    public nomeFantasia: string;

    @required()
    public cnpj: string;

    @required()
    public endereco: Endereco

    constructor() {
        this.endereco = new Endereco();
    }
}