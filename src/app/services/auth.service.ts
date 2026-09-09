import { Injectable, computed, inject, signal } from '@angular/core';
import type { User } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from './supabase-client';

interface AuthResult {
  error: string | null;
}

const ERROR_MESSAGES: Record<string, string> = {
  'Invalid login credentials': 'Correo o contraseña incorrectos.',
  'User already registered': 'Ya existe una cuenta con este correo.',
  'Email not confirmed': 'Debes confirmar tu correo antes de iniciar sesión.',
  'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres.',
  'email rate limit exceeded': 'Se alcanzó el límite de envío de correos del proyecto. Intenta de nuevo más tarde.',
};

function translateError(message: string): string {
  return ERROR_MESSAGES[message] ?? message;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = inject(SUPABASE_CLIENT);

  private currentUser = signal<User | null>(null);
  private ready = signal(false);
  private readyPromise: Promise<void>;

  isAuthenticated = computed(() => this.currentUser() !== null);
  isReady = this.ready.asReadonly();
  fullName = computed(() => (this.currentUser()?.user_metadata?.['full_name'] as string) ?? '');
  email = computed(() => this.currentUser()?.email ?? '');

  constructor() {
    this.readyPromise = this.supabase.auth.getSession().then(({ data }) => {
      this.currentUser.set(data.session?.user ?? null);
      this.ready.set(true);
    });

    this.supabase.auth.onAuthStateChange((_event, session) => {
      this.currentUser.set(session?.user ?? null);
    });
  }

  waitUntilReady(): Promise<void> {
    return this.readyPromise;
  }

  async signUp(email: string, password: string, fullName: string): Promise<AuthResult & { needsEmailConfirmation: boolean }> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) {
      return { error: translateError(error.message), needsEmailConfirmation: false };
    }
    return { error: null, needsEmailConfirmation: !data.session };
  }

  async signIn(email: string, password: string): Promise<AuthResult> {
    const { error } = await this.supabase.auth.signInWithPassword({ email, password });
    return { error: error ? translateError(error.message) : null };
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  async resetPasswordForEmail(email: string): Promise<AuthResult> {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error: error ? translateError(error.message) : null };
  }

  async updatePassword(newPassword: string): Promise<AuthResult> {
    const { error } = await this.supabase.auth.updateUser({ password: newPassword });
    return { error: error ? translateError(error.message) : null };
  }
}
