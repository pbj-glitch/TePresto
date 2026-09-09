import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { AuthService } from './auth.service';
import { SUPABASE_CLIENT } from './supabase-client';

function createFakeSupabase() {
  return {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: () => undefined } } }),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
    },
  };
}

describe('AuthService', () => {
  let service: AuthService;
  let fakeSupabase: ReturnType<typeof createFakeSupabase>;

  beforeEach(() => {
    fakeSupabase = createFakeSupabase();
    TestBed.configureTestingModule({
      providers: [{ provide: SUPABASE_CLIENT, useValue: fakeSupabase }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('is unauthenticated once the initial session resolves', async () => {
    await service.waitUntilReady();
    expect(service.isAuthenticated()).toBe(false);
  });

  it('translates invalid credentials into a Spanish message', async () => {
    fakeSupabase.auth.signInWithPassword.mockResolvedValue({ error: { message: 'Invalid login credentials' } });
    const result = await service.signIn('a@a.com', 'wrong');
    expect(result.error).toBe('Correo o contraseña incorrectos.');
  });

  it('signs in without error when credentials are valid', async () => {
    fakeSupabase.auth.signInWithPassword.mockResolvedValue({ error: null });
    const result = await service.signIn('a@a.com', 'right');
    expect(result.error).toBeNull();
  });

  it('flags needsEmailConfirmation when signUp returns no session', async () => {
    fakeSupabase.auth.signUp.mockResolvedValue({ data: { session: null }, error: null });
    const result = await service.signUp('a@a.com', 'password123', 'Ana');
    expect(result.needsEmailConfirmation).toBe(true);
    expect(fakeSupabase.auth.signUp).toHaveBeenCalledWith({
      email: 'a@a.com',
      password: 'password123',
      options: { data: { full_name: 'Ana' } },
    });
  });
});
