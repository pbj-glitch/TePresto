import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('../pages/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'explore',
        loadComponent: () => import('../pages/explore/explore.page').then(m => m.ExplorePage),
      },
      {
        path: 'add-post',
        loadComponent: () => import('../pages/add-post/add-post.page').then(m => m.AddPostPage),
      },
      {
        path: 'history',
        loadComponent: () => import('../pages/history/history.page').then(m => m.HistoryPage),
      },
      {
        path: 'profile',
        loadComponent: () => import('../pages/profile/profile.page').then(m => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
