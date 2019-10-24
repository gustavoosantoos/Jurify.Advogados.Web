import ClientePreview from './cliente-preview.model';

export class Listagem {
    public clientesAtivos: number;
    public clientesComProcessoAtivo: number;
    public clientes: ClientePreview[];
}
