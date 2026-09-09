import { Component, computed, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonBadge, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { cubeOutline } from 'ionicons/icons';

type HistoryStatus = 'Devuelto' | 'Activo' | 'Atrasado';

interface HistoryEntry {
  id: string;
  itemTitle: string;
  counterpartName: string;
  date: string;
  status: HistoryStatus;
}

interface HistoryGroup {
  date: string;
  entries: HistoryEntry[];
}

const STATUS_COLOR: Record<HistoryStatus, string> = {
  Devuelto: 'success',
  Activo: 'secondary',
  Atrasado: 'danger',
};

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonBadge, IonIcon],
})
export class HistoryPage {
  // Actividad ficticia para probar el maquetado
  private entries = signal<HistoryEntry[]>([
    { id: '1', itemTitle: 'Taladro Bosch 550W', counterpartName: 'Carlos P.', date: 'Hoy', status: 'Activo' },
    { id: '2', itemTitle: 'Carpa 4 personas', counterpartName: 'Ana M.', date: 'Hoy', status: 'Atrasado' },
    { id: '3', itemTitle: 'Proyector Full HD', counterpartName: 'María G.', date: 'Ayer', status: 'Devuelto' },
    { id: '4', itemTitle: 'Escalera 3m', counterpartName: 'Roberto S.', date: '12 de agosto', status: 'Devuelto' },
  ]);

  groups = computed<HistoryGroup[]>(() => {
    const groups: HistoryGroup[] = [];
    for (const entry of this.entries()) {
      const group = groups.find((g) => g.date === entry.date);
      if (group) {
        group.entries.push(entry);
      } else {
        groups.push({ date: entry.date, entries: [entry] });
      }
    }
    return groups;
  });

  constructor() {
    addIcons({ cubeOutline });
  }

  statusColor(status: HistoryStatus): string {
    return STATUS_COLOR[status];
  }
}
