export default class ClienteAtualizacao {

  constructor(
    public codigo: string,
    public nome: string,
    public sobrenome: string,
    public rg: string,
    public cpf: string,
    public email: string,
    public dataNascimento: Date,  
  ) { }
}