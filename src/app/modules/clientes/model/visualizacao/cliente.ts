import Endereco from './endereco';

export default class Cliente {
    codigo: string;
    primeiroNome: string;
    sobrenome: string;
    dataNascimento: Date;
    email: string;
    rg: string;
    cpf: string;
    enderecos: Endereco[];
    dataCriacao: Date;
    dataUltimaAlteracao: Date;
    nomeUsuarioUltimaAlteracao: string;

    constructor() {
        this.enderecos = [];
    }
}
