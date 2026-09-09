import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCardComponent } from './item-card.component';
import { Item } from '../../models/item.model';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;

  const mockItem: Item = {
    id: '1',
    title: 'Taladro Bosch 550W',
    distance: '80m',
    ownerName: 'Carlos P.',
    rating: 4.8,
    guaranteePrice: 5000,
    status: 'Disponible',
    imageUrl: 'assets/taladro.jpeg',
    category: 'Herramientas',
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', mockItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the placeholder once the image fails to load', () => {
    expect(component.imageError()).toBe(false);

    component.onImageError();

    expect(component.imageError()).toBe(true);
  });
});
