import { Injectable, computed, signal } from '@angular/core';
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
      description: 'Taladro percutor con maletín, 2 baterías y set de brocas. Ideal para colgar cuadros, muebles o pequeñas reparaciones.',
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
      description: 'Proyector 1080p con parlante integrado y cable HDMI. Perfecto para noches de cine o presentaciones en la sede social.',
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
      description: 'Carpa impermeable para 4 personas, armado en 5 minutos sin herramientas. Incluye estacas y bolso de transporte.',
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
      description: 'Escalera de aluminio de 3 metros, tijera reforzada. Útil para pintar, podar o limpiar canaletas.',
    },
    {
      id: '5',
      title: 'Aspiradora robot',
      distance: '30m',
      ownerName: 'Javiera L.',
      rating: 4.5,
      guaranteePrice: 12000,
      status: 'Disponible',
      imageUrl: 'assets/aspiradora.jpeg',
      category: 'Hogar',
      description: 'Robot aspirador con mapeo automático y carga inteligente. Ideal para un aseo rápido antes de recibir visitas.',
    },
    {
      id: '6',
      title: 'Bicicleta de montaña',
      distance: '150m',
      ownerName: 'Diego F.',
      rating: 4.9,
      guaranteePrice: 20000,
      status: 'Disponible',
      imageUrl: 'assets/bicicleta.jpeg',
      category: 'Deportes',
      description: 'Bicicleta aro 29 con cambios Shimano, recién revisada. Perfecta para rodar por el parque del sector.',
    },
  ]);

  // Retorna la señal en modo solo lectura
  getItems() {
    return this.items.asReadonly();
  }

  getItem(id: string) {
    return computed(() => this.items().find((item) => item.id === id));
  }
}
