import { Injectable } from '@angular/core';
import { environtment } from '../../../environments/environment';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver'
import { GeneralReportExitInterface } from '../model/interfaces/general_report_exit.interface';



@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  get API_URL() {
    return environtment.api;
  }

  async exportToExcel(data: GeneralReportExitInterface) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte');

    /** INICIO TITULO DE LA HOJA DE EXCEL **/
    worksheet.mergeCells('B2:G2');
    worksheet.getCell('B2').value = 'Grupo: Usuarios - General - Costo';
    worksheet.getCell('B2').font = { bold: true };
    worksheet.getCell('B2').alignment = { horizontal: 'center' };

    worksheet.getCell('H2').value = 'Costo';
    worksheet.getCell('H2').alignment = { horizontal: 'center' };

    worksheet.getCell('I2').value = data.total_cost;
    worksheet.getCell('I2').alignment = { horizontal: 'center' };
    /** INICIO TITULO DE LA HOJA DE EXCEL **/

    /** INICIO SUBTITULO DE LA HOJA DE EXCEL **/
    worksheet.mergeCells('B3:G3');
    worksheet.getCell('B3').value = 'Reporte Costo de Llamadas Salientes';
    worksheet.getCell('B3').alignment = { horizontal: 'center' };

    worksheet.getCell('H3').value = 'Llamadas';
    worksheet.getCell('H3').alignment = { horizontal: 'center' };

    worksheet.getCell('I3').value = data.total_calls;
    worksheet.getCell('I3').alignment = { horizontal: 'center' };
    /** INICIO SUBTITULO DE LA HOJA DE EXCEL **/

    const columns = [
      { name: 'Nombre', width: 20, position: 'B4' },
      { name: 'Extensión', width: 15, position: 'C4' },
      { name: 'Destino', width: 15, position: 'D4' },
      { name: 'Disposición', width: 15, position: 'E4' },
      { name: 'Fecha', width: 15, position: 'F4' },
      { name: 'Hora', width: 15, position: 'G4' },
      { name: 'Duración', width: 15, position: 'H4' },
      { name: 'MXN', width: 15, position: 'I4' },
    ]

    columns.forEach(column => {
      worksheet.getCell(column.position).value = column.name;
      worksheet.getCell(column.position).alignment = { horizontal: 'center' };
      worksheet.getCell(column.position).font = { bold: true };

      const col_letter = column.position.replace(/[0-9]/g, '');
      worksheet.getColumn(col_letter).width = column.width;
    });


    let row = 5;
    data.list_reports.forEach(report => {
      worksheet.getCell('B' + row).value = report.agent;
      worksheet.getCell('B' + row).alignment = { horizontal: 'center' };

      worksheet.getCell('C' + row).value = report.Exten;
      worksheet.getCell('C' + row).alignment = { horizontal: 'center' };

      worksheet.getCell('D' + row).value = report.Destino;
      worksheet.getCell('D' + row).alignment = { horizontal: 'center' };

      worksheet.getCell('E' + row).value = report.Estado;
      worksheet.getCell('E' + row).alignment = { horizontal: 'center' };

      worksheet.getCell('F' + row).value = report.Fecha;
      worksheet.getCell('F' + row).alignment = { horizontal: 'center' };
  
      worksheet.getCell('G' + row).value = report.Hora;
      worksheet.getCell('G' + row).alignment = { horizontal: 'center' };

      worksheet.getCell('H' + row).value = report.Duracion;
      worksheet.getCell('H' + row).alignment = { horizontal: 'center' };

      worksheet.getCell('I' + row).value = report.Costo;
      worksheet.getCell('I' + row).alignment = { horizontal: 'center' };

      row++;
    })

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxml-officedocument.spreadsheet.sheet',
    });
    const date = (new Date().toLocaleDateString()).replace(/\//g, '-');
    FileSaver.saveAs(blob, `reporte_${date}.xlsx`);
  }
}
