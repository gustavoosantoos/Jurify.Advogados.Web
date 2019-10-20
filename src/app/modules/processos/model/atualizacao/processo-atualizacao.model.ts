export class ProcessoAtualizacao {
    constructor(
        public codigo: string,
        public codigoCliente: string,
        public codigoAdvogadoResponsavel: string,
        public numeroProcesso: string,
        public codigoUF: number,
        public titulo: string,
        public descricao: string,
        public juizResponsavel: string,
        public status: number,
        public tipoDePapel: number
    ) { }
}