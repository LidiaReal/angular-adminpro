import { environment } from './../../environments/environment';
import { Pipe, PipeTransform } from '@angular/core';

const base_url = environment.base_url;

/*
  Un pipe modifica la forma visual de como recibimos la información, por ejemplo, si recibimos un string podemos transformarlo de forma visual,
  pero no la referencia ni el objeto.
*/

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios'|'medicos'|'hospitales'): string {
    if(!img) {
      return `${base_url}/upload/${tipo}/no-image`;
    } else if(img.includes('https')) {
      return img;
    } else if(img) {
      return `${base_url}/upload/${tipo}/${img}`;
    } else {
      return `${base_url}/upload/${tipo}/no-image`;
    }

  }

}
