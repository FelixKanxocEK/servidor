import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExtensionsService } from '../../../model/extensions.service';

@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {

  general_exit_form!: FormGroup;

  today: string = '';

  constructor(
    private readonly FormBuilder: FormBuilder,
    private readonly ExtensionsService: ExtensionsService,
  ) {}

  ngOnInit() {
    const now = new Date();
    this.today = now.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  
    // Se inicializa formulario de reporte general de salida
    this.general_exit_form = this.FormBuilder.group({
      init_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]]
    });
  
  }

  get init_date() { return this.general_exit_form.get('init_date') || null }
  get end_date() { return this.general_exit_form.get('end_date') || null }

  async generateExitReportGeneral() {
    // event.preventDefault();
    console.log(this.general_exit_form.value, ' valueeeeeeeeee');
    await this.ExtensionsService.getGeneralReportExit(this.general_exit_form.value);
  }

  /**
   * Valida que la fecha final no sea menor a la fecha inicial
   * @param event 
   */
  validateDates() {
    const { init_date, end_date } = this.general_exit_form.controls;

    if(init_date.value && end_date.value) {
      const init_date_ms = new Date(init_date.value).getTime();
      const end_date_ms = new Date(end_date.value).getTime();

      // Se valida si la fecha de inicio es menor o igual para validar
      if(init_date_ms > end_date_ms) {
        console.log('LA FECHA DE INICIO ES MAYOR');
        end_date.setErrors({ err_date: true });
        end_date.markAllAsTouched();
        return;
      } else {
        const errors = this.end_date?.errors || {};
        delete errors['err_date'];
        this.init_date?.setErrors(Object.keys(errors).length ? errors : null);
      }

      console.log(init_date_ms, ' msss1')
      console.log(end_date_ms, ' msss2')

    }

    console.log(init_date.value);
    console.log(end_date.value);
  }

}
