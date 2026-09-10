import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonAvatar, IonIcon,
  IonList, IonItem, IonLabel, ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  logOutOutline, pricetagOutline, helpCircleOutline,
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

interface ProfileMenuItem {
  label: string;
  icon: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonAvatar, IonIcon,
    IonList, IonItem, IonLabel,
    CommonModule, FormsModule,
  ],
})
export class ProfilePage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  fullName = this.authService.fullName;
  email = this.authService.email;

  initials = computed(() => {
    const name = this.fullName().trim();
    if (!name) return '?';
    const parts = name.split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
  });

  menuItems: ProfileMenuItem[] = [
    { label: 'Mis publicaciones', icon: 'pricetag-outline' },
    { label: 'Ayuda', icon: 'help-circle-outline' },
  ];

  constructor() {
    addIcons({ logOutOutline, pricetagOutline, helpCircleOutline });
  }

  async showComingSoon(label: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: `${label}: esta función estará disponible pronto.`,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }

  async logout(): Promise<void> {
    await this.authService.signOut();
    this.router.navigateByUrl('/login');
  }
}
