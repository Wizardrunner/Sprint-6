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
}
