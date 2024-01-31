// src/app/info-modal/info-modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  template: `
    @if (show) {
      <div class="modal">
        <p>{{ content }}</p>
        <button (click)="closeModal()">Cerrar</button>
      </div>
    }
  `,
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent {
  @Input() content: string = '';
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
