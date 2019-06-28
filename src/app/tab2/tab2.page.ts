import { Component, ViewChild } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from '../services/noticias.service';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  @ViewChild(IonSegment) segment;

  articulos: Article[] = [];
  categorias: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  constructor(private noticiasService: NoticiasService) {}

// tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.setNoticias(this.segment.value);
  }

  setNoticias(categoria: string) {
    this.noticiasService.getCategorias(categoria).subscribe(noticias => {
      this.articulos.push(...noticias.articles);
    });
  }

  setCategorias(value: string) {
    this.articulos = [];
    this.setNoticias(value);
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();

      if (this.articulos.length === 100) {
        event.target.disabled = true;
      }
    }, 500);
  }
}

