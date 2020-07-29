import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // con esto no hace falta importarlo en ningun sitio
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {
    this.theme();
  }

  theme() {
    const url = localStorage.getItem('theme');
    const urlByDefault = './assets/css/colors/default-dark.css';

    if(url == null) {
      this.linkTheme.setAttribute('href', urlByDefault);
    } else {
      this.linkTheme.setAttribute('href', url);
    }
  }

  changeTheme(theme: string) {

    const url = `./assets/css/colors/${theme}.css`
    this.linkTheme.setAttribute('href', url);

    // Guardamos en el local Storage el tema
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();

  }

  checkCurrentTheme() {

    const links = document.querySelectorAll('.selector');

    links.forEach(elem => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if(btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }

    });

  }


}
