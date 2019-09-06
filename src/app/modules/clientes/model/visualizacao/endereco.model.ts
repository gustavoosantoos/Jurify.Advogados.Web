export default class Endereco {
    codigo: string;
    rua: string;
    numero: string;
    complemento: string;
    cidade: string;
    estado: string;
    pais: string;
    cep: string;
    observacoes: string;
    tipo: number = 0;
    tipoEndereco: string;
    dataCriacao: Date;
    dataUltimaAlteracao: Date;
    nomeUsuarioUltimaAlteracao: string;
}
