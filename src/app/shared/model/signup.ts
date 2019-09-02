import { Escritorio } from './escritorio-signup';
import { Usuario } from './usuario-signup';
import { required } from '@rxweb/reactive-form-validators';

export class SignUp {
    @required()
    public usuario: Usuario;

    @required()
    public escritorio: Escritorio;
}