import Endereco from './endereco.model';
import Anexo from './anexo.model';

export default class Cliente {
    codigo: string;
    nome: string;
    sobrenome: string;
    dataNascimento: Date;
    email: string;
    rg: string;
    cpf: string;
    enderecos: Endereco[];
    anexos: Anexo[];
    dataCriacao: Date;
    dataUltimaAlteracao: Date;
    nomeUsuarioUltimaAlteracao: string;

    constructor() {
        this.enderecos = [];
        this.anexos = [];
    }
}
