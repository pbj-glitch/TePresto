import { Component, input, output } from '@angular/core';
import { IonChip, IonLabel } from '@ionic/angular';

@Component({
  selector: 'app-category-chip',
  templateUrl: './category-chip.component.html',
  styleUrls: ['./category-chip.component.scss'],
  imports: [IonChip, IonLabel],
})
export class CategoryChipComponent {
  label = input.required<string>();
  active = input(false);

  chipClick = output<void>();
}
