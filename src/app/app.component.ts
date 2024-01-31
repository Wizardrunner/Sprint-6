import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  seo: boolean = false;
  ads: boolean = false;
  web: boolean = false;
  showPanel: boolean = false;
  totalBudget: number = 0;
  numberOfPages: number = 0; // Inicia en 0
  numberOfLanguages: number = 0; // Inicia en 0

  updateWebOption(): void {
    this.showPanel = this.web;
    this.calculateBudget(); // Asegura el cálculo inicial del presupuesto cuando se selecciona la opción web.
  }

  calculateBudget(): void {
    let baseCost = (this.seo ? 300 : 0) + (this.ads ? 400 : 0) + (this.web ? 500 : 0);
    
    // El costo adicional se calcula como 30€ por cada incremento en páginas o idiomas.
    // Este cálculo asegura un incremento de 30€ por cada página o idioma añadido.
    let additionalCost = (this.numberOfPages + this.numberOfLanguages) * 30;

    this.totalBudget = baseCost + additionalCost;
}

  changePages(change: number): void {
    this.numberOfPages = Math.max(0, this.numberOfPages + change); // Asegura que no sea menor a 0.
    this.calculateBudget(); // Recalcula el presupuesto con cada cambio.
  }

  changeLanguages(change: number): void {
    this.numberOfLanguages = Math.max(0, this.numberOfLanguages + change); // Asegura que no sea menor a 0.
    this.calculateBudget(); // Recalcula el presupuesto con cada cambio.
  }
}
