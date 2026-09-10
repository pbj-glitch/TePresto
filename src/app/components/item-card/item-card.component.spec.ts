import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

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
    description: 'Taladro percutor con maletín.',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ItemCardComponent],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', mockItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('resolves an icon and color for a known category', () => {
    expect(component.categoryIcon()).toBe('hammer-outline');
    expect(component.categoryColorVar()).toBe('primary');
  });

  it('falls back to a generic icon for an unknown category', () => {
    fixture.componentRef.setInput('item', { ...mockItem, category: 'Otra' });
    fixture.detectChanges();

    expect(component.categoryIcon()).toBe('cube-outline');
    expect(component.categoryColorVar()).toBe('medium');
  });
});
