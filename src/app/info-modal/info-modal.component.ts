import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [], // Añadir CommonModule aquí
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent {
  @Input() content: string = '';
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
