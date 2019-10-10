import { required } from '@rxweb/reactive-form-validators';

export default class CadastroEscritorio {
  @required()
  public razaoSocial: string;

  @required()
  public nomeFantasia: string;

  @required()
  public cnpj: string;

}
