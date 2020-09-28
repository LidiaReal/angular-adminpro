import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: []
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( public modalImagenService: ModalImagenService, public fileUploadService: FileUploadService ) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarrModal();
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        Swal.fire('Guardado', 'Los cambios se han guardado correctamente', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch(error => {
        console.log(error);
        Swal.fire('Error', 'No se ha podido actualizar la imagen', 'error');
      })
  }


}
