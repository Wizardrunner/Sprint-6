// src/app/budget.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private budgets: any[] = [];
  private numberOfPages = 1;
  private numberOfLanguages = 1;

  
  setPages(pages: number) {
    this.numberOfPages = pages;
  }

  setLanguages(languages: number) {
    this.numberOfLanguages = languages;
  }

  getPages(): number {
    return this.numberOfPages;
  }

  getLanguages(): number {
    return this.numberOfLanguages;
  }

  calculateTotal(seo: boolean, ads: boolean, web: boolean, pages: number, languages: number): number {
    let total = 0;
    if (seo) total += 300;
    if (ads) total += 400;
    if (web) total += 500; // Costo base por elegir hacer una página web
    total += pages * languages * 30; // Costo adicional por el número de páginas e idiomas
    return total;
  }
  addBudget(budget: any) {
    const newBudget = {
      ...budget,
      date: new Date() // Agrega la fecha actual al presupuesto
    };
    this.budgets.push(newBudget);
  }

  getBudgets() {
    return this.budgets;
  }

  setBudgets(budgets: any[]) {
    this.budgets = budgets;
  }


}
