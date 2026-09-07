import { Injectable, signal } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  // Lista de items ficticios para probar el maquetado
  private items = signal<Item[]>([
    {
      id: '1',
      title: 'Taladro Bosch 550W',
      distance: '80m',
      ownerName: 'Carlos P.',
      rating: 4.8,
      guaranteePrice: 5000,
      status: 'Disponible',
      imageUrl: 'assets/taladro.jpeg',
      category: 'Herramientas',
    },
    {
      id: '2',
      title: 'Proyector Full HD',
      distance: '120m',
      ownerName: 'María G.',
      rating: 4.9,
      guaranteePrice: 15000,
      status: 'Disponible',
      imageUrl: 'assets/proyector.jpeg',
      category: 'Electrónica',
    },
    {
      id: '3',
      title: 'Carpa 4 personas',
      distance: '200m',
      ownerName: 'Ana M.',
      rating: 4.7,
      guaranteePrice: 10000,
      status: 'Disponible',
      imageUrl: 'assets/carpa.jpeg',
      category: 'Camping',
    },
    {
      id: '4',
      title: 'Escalera 3m',
      distance: '50m',
      ownerName: 'Roberto S.',
      rating: 4.6,
      guaranteePrice: 3000,
      status: 'Ocupado',
      imageUrl: 'assets/escalera.jpeg',
      category: 'Herramientas',
    },
  ]);

  // Retorna la señal en modo solo lectura
  getItems() {
    return this.items.asReadonly();
  }
}
