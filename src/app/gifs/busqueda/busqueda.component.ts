import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  // con el signo de exclamacion"!" le estoy diciendo a angular que objeto 'txtBuscar!' no sera nulo
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){}

  buscar(){

    const valor = this.txtBuscar.nativeElement.value;

    if(valor.trim().length>0){

      this.gifsService.buscarGifs(valor);
  
      this.txtBuscar.nativeElement.value = '';
    }

  }
}
