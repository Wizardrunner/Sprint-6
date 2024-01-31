// src/app/budgets-list/budgets-list.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="budgets.length > 0">
      <div *ngFor="let budget of budgets" class="budget-box">
        <div>{{budget.name}} ({{budget.phone}}, {{budget.email}})</div>
        <div>Servicios contratados: {{budget.services}}</div>
        <div>Total: {{budget.total}}€</div>
        <button (click)="shareBudgetURL(budget)">Compartir URL</button>
      </div>
    </div>
    <div *ngIf="budgets.length === 0">
      <p>No hay presupuestos disponibles.</p>
    </div>
  `,
  styleUrls: ['./budgets-list.component.css']
})
export class BudgetsListComponent {
  @Input() budgets: Array<any> = [];

  shareBudgetURL(budget: any) {
    const url = this.generateBudgetURL(budget);
    navigator.clipboard.writeText(url).then(() => {
      console.log('URL copiada al portapapeles');
    }).catch(err => {
      console.error('Error al copiar URL:', err);
    });
  }
  
  generateBudgetURL(budget: any): string {
    const baseUrl = 'http://localhost:4200/home';
    const queryParams = [];
  
    // Asegúrate de que las propiedades existen y son válidas
    if (budget.web !== undefined) queryParams.push(`WebPage=${budget.web}`);
    if (budget.seo !== undefined) queryParams.push(`CampaingSeo=${budget.seo}`);
    if (budget.pages !== undefined) queryParams.push(`pages=${budget.pages}`);
    if (budget.languages !== undefined) queryParams.push(`lang=${budget.languages}`);
  
    // Construye la URL completa con los parámetros de consulta
    return `${baseUrl}?${queryParams.join('&')}`;
  }
        }
