// panel.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-panel',
  standalone: true,
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  numberOfPages: number = 1;
  numberOfLanguages: number = 1;

  @Output() configurationChange = new EventEmitter<{pages: number, languages: number}>();

  changePages(change: number) {
    this.numberOfPages = Math.max(1, this.numberOfPages + change);
    this.emitConfigurationChange();
  }

  changeLanguages(change: number) {
    this.numberOfLanguages = Math.max(1, this.numberOfLanguages + change);
    this.emitConfigurationChange();
  }

  private emitConfigurationChange() {
    this.configurationChange.emit({pages: this.numberOfPages, languages: this.numberOfLanguages});
  }
}
