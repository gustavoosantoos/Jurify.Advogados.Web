import EnderecoCadastro from './endereco-cadastro.model';

export default class ClienteCadastro {
  public nome: string;
  public sobrenome: string;
  public rg: string;
  public cpf: string;
  public email: string;
  public dataNascimento: Date;
  public enderecos: EnderecoCadastro[] = [];
  public endereco: EnderecoCadastro;

  constructor() {
    const primeiroEndereco = new EnderecoCadastro();
    this.enderecos.push(primeiroEndereco);
    this.endereco = primeiroEndereco;
  }
}