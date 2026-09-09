import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonGrid, IonRow, IonCol } from '@ionic/angular';
import { ItemService } from '../../services/item.service';
import { ItemCardComponent } from '../../components/item-card/item-card.component';
import { CategoryChipComponent } from '../../components/category-chip/category-chip.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonGrid, IonRow, IonCol,
    ItemCardComponent, CategoryChipComponent,
  ],
})
export class ExplorePage {
  private itemService = inject(ItemService);
  private allItems = this.itemService.getItems();

  searchTerm = signal('');
  selectedCategory = signal<string | null>(null);

  categories = computed(() => Array.from(new Set(this.allItems().map((item) => item.category))));

  items = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const category = this.selectedCategory();

    return this.allItems().filter((item) => {
      const matchesCategory = !category || item.category === category;
      const matchesTerm = !term || item.title.toLowerCase().includes(term);
      return matchesCategory && matchesTerm;
    });
  });

  onSearch(term: string | null | undefined): void {
    this.searchTerm.set(term ?? '');
  }

  toggleCategory(category: string): void {
    this.selectedCategory.set(this.selectedCategory() === category ? null : category);
  }
}
