import { Anexo } from './anexo.model';

export class Evento {
    codigo: string;
    titulo: string;
    descricao: string;
    dataHoraEvento: Date;
    anexos: Anexo[];
}
