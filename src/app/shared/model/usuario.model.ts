export class UsuarioModel {
    codigoEscritorio: string;
    credenciais: {
        numeroOab: string,
        estado: {
            codigo: number,
            nome: string,
            uf: string
        },
        caminhoFoto: string
    };
    username: string;
    senha: string;
    informacoesPessoais: {
        primeiroNome: string,
        ultimoNome: string
    };
    permissoes: {
        nome: string,
        valor: string
    };
    codigo: string;
    apagado: boolean;
}