import Endereco from './endereco.model';
import Anexo from './anexo.model';
import { Processo } from './processos.model';

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
    processosJuridicos: Processo[];
    dataCriacao: Date;
    dataUltimaAlteracao: Date;
    nomeUsuarioUltimaAlteracao: string;

    constructor() {
        this.enderecos = [];
        this.anexos = [];
        this.processosJuridicos = [];
    }
}
