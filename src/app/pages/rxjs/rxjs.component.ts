import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    /* // Una vez suscritos, el observable ya empieza a trabajar y cada segundo vemos en la consola la palabra 'tick'
   this.retornaObservable().pipe(
      retry(2)
    ).subscribe(
      valor => console.log('Subs: ', valor),
      error => console.warn('Error: ', error),
      () => console.info('Obs terminado')
    ); */

    this.intervalSubs = this.retornaIntervalo()
      .subscribe(
        (valor) => console.log(valor)
      )

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number>{
    // es un observale creado automáticamente de rxjs que devuelve números de un intervalo
    return interval(100)
                        .pipe(
                          // take(10),
                          map(valor => valor + 1),
                          filter(valor => this.isEvenNumber(valor)),
                        );

  }

  isEvenNumber(number: number): boolean {
    const division = number % 2;
    if(division === 0) {
      return true;
    } else {
      return false;
    }
  }



  retornaObservable(): Observable<number> {
    let i = 0

    // Un observable no se ejecuta, hasta que no haya por lo menos alguien suscrito
    const obs$ = new Observable<number>( observer => {

      const intervalo = setInterval( () => {

        i++;
        observer.next(i);

        if(i === 4){
          clearInterval(intervalo);
          observer.complete();
        }

        if(i === 2){
          observer.error('i llegó al valor de 2');
        }

      }, 1000)

    });

    return obs$;

  }

}
