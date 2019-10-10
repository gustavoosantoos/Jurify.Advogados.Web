import { required } from '@rxweb/reactive-form-validators';

export class Usuario {
    @required()
    public nome: string;

    @required()
    public sobrenome: string;

    @required()
    public email: string;

    @required()
    public senha: string;

    @required()
    public numeroOab: string;

    @required()
    public ehAdministrador: string;

    public codigoUsuario: string;

    public codigoEscritorio: string;


}
