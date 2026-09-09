import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonAvatar, IonIcon,
  IonList, IonItem, IonLabel,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  personCircleOutline, logOutOutline, pricetagOutline, helpCircleOutline, chevronForwardOutline,
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

  fullName = this.authService.fullName;
  email = this.authService.email;

  menuItems: ProfileMenuItem[] = [
    { label: 'Mis publicaciones', icon: 'pricetag-outline' },
    { label: 'Ayuda', icon: 'help-circle-outline' },
  ];

  constructor() {
    addIcons({ personCircleOutline, logOutOutline, pricetagOutline, helpCircleOutline, chevronForwardOutline });
  }

  async logout(): Promise<void> {
    await this.authService.signOut();
    this.router.navigateByUrl('/login');
  }
}
