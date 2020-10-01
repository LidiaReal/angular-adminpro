import { Hospital } from './hospital.model';

interface _medicolUser {
  _id: string;
  nombre: string;
  img: string;
}

export class Medico {

  constructor(
    public nombre: string,
    public _id?: string,
    public img?: string,
    public usuario?: _medicolUser,
    public hospital?: Hospital
  ) {}

}
