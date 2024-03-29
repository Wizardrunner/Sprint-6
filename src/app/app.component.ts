// src/app/app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { BudgetService } from './budget.service';
import { BudgetsListComponent } from './budgets-list/budgets-list.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, InfoModalComponent, BudgetsListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  seo: boolean = false;
  ads: boolean = false;
  web: boolean = false;
  showPanel: boolean = false;
  totalBudget: number = 0;
  numberOfPages: number = 0;
  numberOfLanguages: number = 0;
  modalContent: string = '';
  showModal: boolean = false;
  serviceError: boolean = false;

  customerName: string = '';
  customerPhone: string = '';
  customerEmail: string = '';

  nameError: string = '';
  phoneError: string = '';
  emailError: string = '';
  serviceErrorMessage: string = '';

  isNameValid: boolean = false;
  isPhoneValid: boolean = false;
  isEmailValid: boolean = false;
  isServiceSelected: boolean = false; // Para el estado de selección de servicios

  validationAttempted = {
    name: false,
    phone: false,
    email: false,
    service: false // Asume que también quieres rastrear el intento de validación para la selección de servicio
  };


  // Propiedad para el filtro de búsqueda
  filterText: string = '';
  currentSort: { field: string, direction: string } = { field: '', direction: 'asc' };

  validateName() {
    const regex = /^[a-zA-ZñÑçÇáéíóúÁÉÍÓÚ\s]{3,}$/;
    if (!regex.test(this.customerName)) {
      this.nameError = "Mínim 3 lletres!";
      this.isNameValid = false;
    } else {
      this.nameError = "";
      this.isNameValid = true;
    }
    this.validationAttempted.name = true;
  }
      
  validatePhone() {
    this.validationAttempted.phone = true;
    const regex = /^[0-9]{9}$/;
    this.isPhoneValid = regex.test(this.customerPhone);
    this.phoneError = this.isPhoneValid ? "" : "9 números!";
  }
  
  validateEmail() {
    this.validationAttempted.email = true;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.isEmailValid = regex.test(this.customerEmail);
    this.emailError = this.isEmailValid ? "" : "Format d'email!";
  }
  
  validateServiceSelection() {
    this.validationAttempted.service = true;
    this.isServiceSelected = this.seo || this.ads || this.web;
    this.serviceError = !this.isServiceSelected;
    this.serviceErrorMessage = this.isServiceSelected ? "" : "Seleccioni un Servei";
  }
    
  // Método para abrir el modal
  openModal(content: string): void {
    this.modalContent = content;
    this.showModal = true;
    console.log('Modal should open:', this.showModal, this.modalContent);
  }
  
  // Método para cerrar el modal
  closeModal(): void {
    this.showModal = false;
  }

  updateWebOption(): void {
    this.showPanel = this.web;
    this.calculateBudget();
    this.validateServiceSelection(); // Añadido para validar la selección de servicios
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

  constructor(
    private budgetService: BudgetService, 
    private route: ActivatedRoute
  ) {
    // Restaura el estado desde la URL al iniciar la aplicación
    this.restoreStateFromURL();
  }

  private restoreStateFromURL() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['WebPage'] !== undefined) {
        this.web = params['WebPage'] === 'true';
      }
      if (params['CampaingSeo'] !== undefined) {
        this.seo = params['CampaingSeo'] === 'true';
      }
      if (params['pages'] !== undefined) {
        this.numberOfPages = Number(params['pages']) || 0;
      }
      if (params['lang'] !== undefined) {
        this.numberOfLanguages = Number(params['lang']) || 0;
      }
      // Recalcular el presupuesto basado en los parámetros actualizados
      this.calculateBudget();
    });
  }

  handleShareUrl(url: string) {
    this.modalContent = url;
    this.showModal = true;
  }


  requestBudget() {
    // Marcar todos los campos como intentados al solicitar el presupuesto
    Object.keys(this.validationAttempted).forEach((key) => {
      const validKey = key as keyof typeof this.validationAttempted;
      this.validationAttempted[validKey] = true;
    });
  
    console.log('Nombre del cliente:', this.customerName);
    console.log('Teléfono del cliente:', this.customerPhone);
    console.log('Email del cliente:', this.customerEmail);
  
    // Restablecer los mensajes de error
    this.nameError = '';
    this.phoneError = '';
    this.emailError = '';
  
    // Validar cada campo
    this.validateName();
    this.validatePhone();
    this.validateEmail();
    this.validateServiceSelection();
  
    // Verificar si hay errores
    if (this.serviceError || this.nameError || this.phoneError || this.emailError) {
      return; // Interrumpir si hay errores
    }
  
    // Si todo es válido, procedemos a crear el objeto de presupuesto
    const budgetDetails = {
      name: this.customerName,
      phone: this.customerPhone,
      email: this.customerEmail,
      services: this.getServices(),
      total: this.totalBudget,
      web: this.web,
      seo: this.seo,
      pages: this.numberOfPages,
      languages: this.numberOfLanguages
    };
  
    // Añadir presupuesto mediante el servicio y restablecer el formulario
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
      if (this.web) {
        services.push(`Web (${this.numberOfPages} páginas ${this.numberOfLanguages} idiomas)`);
      }
          return services.join(', ');
    }
  
    resetForm() {
      this.customerName = '';
      this.customerPhone = '';
      this.customerEmail = '';
      this.seo = this.ads = this.web = false;
      this.numberOfPages = this.numberOfLanguages = 0;
      this.validationAttempted.name = false;
      this.validationAttempted.phone = false;
      this.validationAttempted.email = false;    
      this.calculateBudget();
    }
    // Métodos para ordenar los presupuestos
    sortByDate() {
      const budgets = this.getBudgets();
      budgets.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  
    sortByPrice() {
      const budgets = this.getBudgets();
      budgets.sort((a, b) => b.total - a.total);
      // Implementar actualización de la lista
    }
  
    sortAlphabetically() {
      const budgets = this.getBudgets();
      budgets.sort((a, b) => a.name.localeCompare(b.name));
      // Implementar actualización de la lista
    }
  
    getFilteredBudgets() {
      if (!this.filterText) return this.getBudgets();
      return this.getBudgets().filter(budget => 
        budget.name.toLowerCase().includes(this.filterText.toLowerCase()));
    }

    sortBudgets(field: 'date' | 'total' | 'name') {
      const budgets = this.getBudgets();
      const isAsc = this.currentSort.field === field && this.currentSort.direction === 'asc';
      
    
      // Actualizar la dirección en la primera llamada si el campo es el mismo
      if (this.currentSort.field === field) {
        this.currentSort.direction = isAsc ? 'desc' : 'asc';
      } else {
        // Si se cambia de campo, empezar con 'asc'
        this.currentSort.direction = 'asc';
      }
    
      this.currentSort.field = field;
      
      budgets.sort((a, b) => {
        let comparison = 0;
        if (field === 'date') {
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (field === 'total') {
          comparison = a.total - b.total;
        } else if (field === 'name') {
          comparison = a.name.localeCompare(b.name);
        }
        return this.currentSort.direction === 'asc' ? comparison : -comparison;
      });
    
      this.budgetService.setBudgets(budgets);
    }
}