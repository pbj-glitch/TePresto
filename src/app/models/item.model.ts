// src/app/models/item.model.ts
export interface Item {
  id: string;
  title: string;
  distance: string;
  ownerName: string;
  rating: number;
  guaranteePrice: number;
  status: 'Disponible' | 'Ocupado';
  imageUrl: string;
  category: string;
}
