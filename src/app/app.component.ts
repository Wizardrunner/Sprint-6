// src/app/app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { BudgetService } from './budget.service';
import { BudgetsListComponent } from './budgets-list/budgets-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, InfoModalComponent, BudgetsListComponent],
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
  modalContent: string = '';
  showModal: boolean = false;

  customerName: string = '';
  customerPhone: string = '';
  customerEmail: string = '';

  // Método para abrir el modal
  openModal(content: string): void {
    this.modalContent = content;
    this.showModal = true;
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.showModal = false;
  }

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

  constructor(private budgetService: BudgetService) {}

  requestBudget() {
    const budgetDetails = {
      name: this.customerName,
      phone: this.customerPhone,
      email: this.customerEmail,
      services: this.getServices(),
      total: this.totalBudget
    };

    this.budgetService.addBudget(budgetDetails);
    this.resetForm();
  }

    // Agrega un método para obtener los presupuestos
    getBudgets() {
      return this.budgetService.getBudgets();
    }
  
  
    getServices() {
      let services = [];
      if (this.seo) services.push('SEO');
      if (this.ads) services.push('Publicidad');
      if (this.web) services.push(`Web (${this.numberOfPages} páginas, ${this.numberOfLanguages} idiomas)`);
      return services.join(', ');
    }
  
    resetForm() {
      this.customerName = '';
      this.customerPhone = '';
      this.customerEmail = '';
      this.seo = this.ads = this.web = false;
      this.numberOfPages = this.numberOfLanguages = 0;
      this.calculateBudget();
    }
  
}
