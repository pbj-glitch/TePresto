import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { vi } from 'vitest';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

function runGuard() {
  return TestBed.runInInjectionContext(() =>
    authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
  );
}

describe('authGuard', () => {
  it('allows navigation when the user is authenticated', async () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { waitUntilReady: () => Promise.resolve(), isAuthenticated: () => true } },
        { provide: Router, useValue: { parseUrl: vi.fn() } },
      ],
    });

    expect(await runGuard()).toBe(true);
  });

  it('redirects to /login when the user is not authenticated', async () => {
    const parseUrl = vi.fn().mockReturnValue('url-tree');
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { waitUntilReady: () => Promise.resolve(), isAuthenticated: () => false } },
        { provide: Router, useValue: { parseUrl } },
      ],
    });

    expect(await runGuard()).toBe('url-tree');
    expect(parseUrl).toHaveBeenCalledWith('/login');
  });
});
