import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { ItemDetailPage } from './item-detail.page';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

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

describe('ItemDetailPage', () => {
  let component: ItemDetailPage;
  let fixture: ComponentFixture<ItemDetailPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ItemDetailPage],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } },
        },
        {
          provide: ItemService,
          useValue: { getItem: (_id: string) => signal(mockItem) },
        },
      ],
    });
    fixture = TestBed.createComponent(ItemDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('resolves the item matching the route id', () => {
    expect(component.item()?.title).toBe('Taladro Bosch 550W');
  });

  it('marks the loan as requested after requestLoan()', () => {
    expect(component.requested()).toBe(false);
    component.requestLoan();
    expect(component.requested()).toBe(true);
  });
});
