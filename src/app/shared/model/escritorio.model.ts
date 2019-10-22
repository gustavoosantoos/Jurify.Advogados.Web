import { latitude, longitude } from '@rxweb/reactive-form-validators';

export class Escritorio {
    constructor(
        informacoes: {
            razaoSocial: string,
            nomeFantasia: string,
            cnpj: string
        },
        endereco: {
            codigoEscritorio: string,
            cep: string,
            rua: string,
            numero: string,
            complemento: string,
            bairro: string,
            cidade: string,
            estado: string,
            latitude: string,
            longitude: string,
            codigo: string,
            apagado: string
        }
    ){}
}