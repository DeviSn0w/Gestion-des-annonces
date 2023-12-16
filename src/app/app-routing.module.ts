import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'add-annonce',
    loadChildren: () => import('./pages/add-annonce/add-annonce.module').then( m => m.AddAnnoncePageModule)
  },
  {
    path: 'annonce-detail/:id',
    loadChildren: () => import('./pages/annonce-detail/annonce-detail.module').then( m => m.AnnonceDetailPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./pages/profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./private/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./private/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'mes-annonces',
    loadChildren: () => import('./pages/mes-annonces/mes-annonces.module').then( m => m.MesAnnoncesPageModule)
  },
  {
    path: 'annonces',
    loadChildren: () => import('./pages/annonces/annonces.module').then( m => m.AnnoncesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
