import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import { lastValueFrom } from 'rxjs';
import { Extension, Extensions } from '../pages/extensions/extensions/interfaces/extensions.interface';

@Injectable({
  providedIn: 'root'
})
export class ExtensionsService {

  constructor(
    private readonly HttpClient: HttpClient, 
    private readonly UtilsService: UtilsService
  ) { }

  async getExtensions(): Promise<Extensions> {
    try {
      
      const result = await lastValueFrom(this.HttpClient.get<Extension[]>(`${this.UtilsService.API_URL}/extensions`));

      if(result) {
        return { extensions: result, cdr: []};
      } else {
        return {
          cdr: [],
          extensions: [],
        };
      }
    } catch (error) {
      return {
        cdr: [],
        extensions: [],
      };
    }
  }

  async getGeneralReportExit(data: {init_date: string, end_date: string}) {
    try {
      const result = await lastValueFrom(this.HttpClient.post(`${this.UtilsService.API_URL}/extensions/general_report_exit`, {
        ...data
      }));
    
      console.log(result);
      return [];
    } catch (error) {
      console.log(error, ' error');
      return [];
    }
  }

}
