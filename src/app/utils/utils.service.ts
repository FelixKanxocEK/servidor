import { Injectable } from '@angular/core';
import { environtment } from '../../../environments/environment';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver'



@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  get API_URL() {
    return environtment.api;
  }

  async exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte');

    /** INICIO TITULO DE LA HOJA DE EXCEL **/
    worksheet.mergeCells('B2:G2');
    worksheet.getCell('B2').value = 'Grupo: Usuarios - General - Costo';
    worksheet.getCell('B2').font = { bold: true };
    worksheet.getCell('B2').alignment = { horizontal: 'center' };

    worksheet.getCell('H2').value = 'Costo';
    worksheet.getCell('H2').alignment = { horizontal: 'center' };

    worksheet.getCell('I2').value = 'COSTO EJEMPLO XDXDXD';
    worksheet.getCell('I2').alignment = { horizontal: 'center' };
    /** INICIO TITULO DE LA HOJA DE EXCEL **/

    /** INICIO SUBTITULO DE LA HOJA DE EXCEL **/
    worksheet.mergeCells('B3:G3');
    worksheet.getCell('B3').value = 'Reporte Costo de Llamadas Salientes';
    worksheet.getCell('B3').alignment = { horizontal: 'center' };

    worksheet.getCell('H3').value = 'Llamadas';
    worksheet.getCell('H3').alignment = { horizontal: 'center' };

    worksheet.getCell('I3').value = '14510354';
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

    // const data = [
    //   { id: 1, name: 'Juan Perez', email: 'juan@example.com', isActive: true },
    //   { id: 2, name: 'Ana Lopez', email: 'ana@example.com', isActive: true },
    // ]

    // console.log('Data a exportar:', data);
    // console.log('Columnas definidas:', worksheet.columns.map(col => col.key));
    // data.forEach(d => {
    //   worksheet.addRow(d);
    // })


    // worksheet.getRow(1).eachCell((cell) => {
    //   cell.font = { bold: true, color: { argb: 'FFFFFFF' } };
    //   cell.fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     fgColor: { argb: 'FF0070C0' },
    //   };
    //   cell.alignment = { vertical: 'middle', horizontal: 'center' };
    //   cell.border = {
    //     top: { style: 'thin' },
    //     bottom: { style: 'thin' },

    //   }
    // })

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxml-officedocument.spreadsheet.sheet',
    });
    FileSaver.saveAs(blob, 'reporte.xlsx');
  }
}
