// src/app/budgets-list/budgets-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [CommonModule],
  template: `
<div *ngIf="budgets.length > 0" class="container mt-4">
  <div *ngFor="let budget of budgets" class="option-box p-5 mb-4 bg-white rounded-3 mx-auto">
    <div class="d-flex justify-content-between align-items-start">
      <div>
        <h3 class="mb-2">{{ budget.name }}</h3>
        <p class="mb-0">{{ budget.phone }}<br>{{ budget.email }}</p>
      </div>
      <div>
        <h4 class="fw-bold mt-0 mb-2">Serveis contractats:</h4>
        <ul class="list-unstyled">
  <li *ngFor="let service of budget.services?.split(', ') || []"><span class="me-2">•</span>{{ service }}</li>
</ul>
      </div>
      <div class="text-end">
        <p class="fw-bold mt-0">Total: <span class="fw-bold fs-2">{{ budget.total }}</span>€</p>
      </div>
    </div>
    <div class="text-end mt-3">
      <button class="btn btn-primary" (click)="shareBudgetURL(budget)">Compartir URL</button>
    </div>
  </div>
</div>
    <div *ngIf="budgets.length === 0" class="mx-auto nohiha">
    <p>No hi ha pressupostos disponibles.</p>
  </div>
  `,
  styleUrls: ['./budgets-list.component.scss']
})
export class BudgetsListComponent {
  @Input() budgets: Array<any> = [];
  @Output() shareUrl = new EventEmitter<string>(); // Nuevo EventEmitter

  shareBudgetURL(budget: any) {
    const url = this.generateBudgetURL(budget);
    this.shareUrl.emit(url); // Emitir la URL
    navigator.clipboard.writeText(url).then(() => {
      console.log('URL copiada al portapapeles');
    }).catch(err => {
      console.error('Error al copiar URL:', err);
    });
  }
  
  generateBudgetURL(budget: any): string {
    const baseUrl = 'http://localhost:4200/home';
    const queryParams = [];
  
    if (budget.web !== undefined) queryParams.push(`WebPage=${budget.web}`);
    if (budget.seo !== undefined) queryParams.push(`CampaingSeo=${budget.seo}`);
    if (budget.pages !== undefined) queryParams.push(`pages=${budget.pages}`);
    if (budget.languages !== undefined) queryParams.push(`lang=${budget.languages}`);
  
    // Construye la URL completa con los parámetros de consulta
    return `${baseUrl}?${queryParams.join('&')}`;
  }
        }
