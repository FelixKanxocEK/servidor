
export interface GeneralReportExitInterface {
    total_calls: number;
    total_cost: number;
    list_reports: ListReports[];
}

interface ListReports {
    agent: string,
    Exten: string,
    Destino: string,
    Estado: string,
    Fecha: string,
    Hora: string,
    dstchannel: string,
    lastapp: string,
    cdr_id: number,
    Duracion: string,
    Costo: number
}