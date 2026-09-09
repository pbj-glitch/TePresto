import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonAvatar, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personCircleOutline, logOutOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonAvatar, IonIcon,
    CommonModule, FormsModule,
  ],
})
export class ProfilePage {
  private authService = inject(AuthService);
  private router = inject(Router);

  fullName = this.authService.fullName;
  email = this.authService.email;

  constructor() {
    addIcons({ personCircleOutline, logOutOutline });
  }

  async logout(): Promise<void> {
    await this.authService.signOut();
    this.router.navigateByUrl('/login');
  }
}
