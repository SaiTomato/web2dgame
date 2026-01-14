import { Routes } from '@angular/router';
import { GamePageComponent } from './page/game-page/game-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'game', pathMatch: 'full' },
    { path: 'game', component: GamePageComponent },
];
