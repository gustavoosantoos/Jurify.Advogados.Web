export class EscritorioAtualizacao {
    constructor(
        public razaoSocial: string,
        public nomeFantasia: string,
        public cnpj: string,
        public endereco: {
            cep: string,
            rua: string,
            numero: string,
            bairro: string,
            cidade: string,
            estado: string,
            complemento: string
        }
    ) { }
}