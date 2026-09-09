import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonTextarea,
  IonSelect, IonSelectOption, IonButton, IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
  imports: [
    CommonModule, ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonTextarea,
    IonSelect, IonSelectOption, IonButton, IonIcon,
  ],
})
export class AddPostPage {
  private fb = inject(FormBuilder);

  categories = ['Herramientas', 'Electrónica', 'Camping', 'Hogar', 'Deportes'];

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    category: ['', [Validators.required]],
    guaranteePrice: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  submitted = signal(false);

  constructor() {
    addIcons({ cameraOutline });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    // La publicación real (Supabase) todavía no está conectada; solo maquetado.
    this.submitted.set(true);
  }
}
