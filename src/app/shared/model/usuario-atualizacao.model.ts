export class UsuarioAtualizacao {
    constructor(
        public usuario: {
            codigoUsuario: string,
            codigoEscritorio: string,
            nome: string,
            sobrenome: string,
            email: string,
            senha: string,
            estado: number,
            numeroOAB: string,
            ehAdministrador: string
        }
    ) { }
}