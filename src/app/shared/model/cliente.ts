import { Endereco } from './endereco';

export class Cliente {
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
}