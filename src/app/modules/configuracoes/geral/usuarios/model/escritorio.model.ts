import { required } from '@rxweb/reactive-form-validators';

export class CadastroEscritorio {
  @required()
  public razaoSocial: string;

  @required()
  public nomeFantasia: string;

  @required()
  public cnpj: string;

}
