import { Evento } from './evento.model';

export class Processo {
    public codigo: string;
    public dataCriacao: Date;
    public dataUltimaAlteracao: Date;
    public titulo: string;
    public descricao: string;
    public juizResponsavel: string;
    public numero: string;
    public status: number;
    public tipoDePapel: number;

    public codigoAdvogadoResponsavel: string;
    public nomeAdvogadoResponsavel: string;

    public eventos: Evento[];

    public nomeUsuarioUltimaAlteracao: string;
}
