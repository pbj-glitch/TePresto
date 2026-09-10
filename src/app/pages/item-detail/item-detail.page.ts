import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent,
  IonBadge, IonIcon, IonButton,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  hammerOutline, hardwareChipOutline, bonfireOutline, homeOutline, basketballOutline, cubeOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';
import { ItemService } from '../../services/item.service';
import { getCategoryStyle } from '../../models/category-style';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
  imports: [
    CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent,
    IonBadge, IonIcon, IonButton,
  ],
})
export class ItemDetailPage {
  private route = inject(ActivatedRoute);
  private itemService = inject(ItemService);

  private id = this.route.snapshot.paramMap.get('id') ?? '';
  item = this.itemService.getItem(this.id);

  requested = signal(false);

  private categoryStyle = computed(() => getCategoryStyle(this.item()?.category));

  categoryIcon = computed(() => this.categoryStyle().icon);
  categoryColorVar = computed(() => this.categoryStyle().colorVar);

  constructor() {
    addIcons({
      hammerOutline, hardwareChipOutline, bonfireOutline, homeOutline, basketballOutline, cubeOutline,
      checkmarkCircleOutline,
    });
  }

  requestLoan(): void {
    if (this.requested()) return;
    this.requested.set(true);
  }
}
