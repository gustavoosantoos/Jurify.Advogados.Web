import { required } from '@rxweb/reactive-form-validators';

export class CadastroUsuario {

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
  public estado: string;

  @required()
  public ehAdministrador: string;

  public codigoEscritorio: string;

  public codigoUsuario: string;

}
