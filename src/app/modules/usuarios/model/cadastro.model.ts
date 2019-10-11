import { required } from '@rxweb/reactive-form-validators';
import { CadastroUsuario } from 'src/app/modules/usuarios/model/usuario.model';
import { CadastroEscritorio } from 'src/app/modules/usuarios/model/escritorio.model';

export class Cadastro {

  @required()
  public usuario: CadastroUsuario;

  @required()
  public escritorio: CadastroEscritorio;

}
