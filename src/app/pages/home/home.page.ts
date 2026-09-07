import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonSearchbar, IonGrid, IonRow, IonCol, IonCard, 
  IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonBadge, IonButton 
} from '@ionic/angular';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonSearchbar, IonGrid, IonRow, IonCol, IonCard, 
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonBadge, IonButton
  ],
})
export class HomePage {
  private itemService = inject(ItemService);
  public items = this.itemService.getItems();
}
