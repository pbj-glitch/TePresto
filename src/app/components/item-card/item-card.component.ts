import { Component, input, signal } from '@angular/core';
import {
  IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { pricetagOutline } from 'ionicons/icons';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  imports: [
    IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon,
  ],
})
export class ItemCardComponent {
  item = input.required<Item>();

  imageError = signal(false);

  constructor() {
    addIcons({ pricetagOutline });
  }

  onImageError(): void {
    this.imageError.set(true);
  }
}
