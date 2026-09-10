import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  hammerOutline, hardwareChipOutline, bonfireOutline, homeOutline, basketballOutline, cubeOutline,
} from 'ionicons/icons';
import { Item } from '../../models/item.model';
import { getCategoryStyle } from '../../models/category-style';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  imports: [
    RouterLink,
    IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon,
  ],
})
export class ItemCardComponent {
  item = input.required<Item>();

  private categoryStyle = computed(() => getCategoryStyle(this.item().category));

  categoryIcon = computed(() => this.categoryStyle().icon);
  categoryColorVar = computed(() => this.categoryStyle().colorVar);

  constructor() {
    addIcons({ hammerOutline, hardwareChipOutline, bonfireOutline, homeOutline, basketballOutline, cubeOutline });
  }
}
