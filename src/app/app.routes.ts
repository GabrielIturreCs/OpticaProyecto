import { Routes } from '@angular/router';
import { OpticavistasComponent } from './componentes/opticavistas/opticavistas.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'optica',
        pathMatch: 'full'
    },
    {
        path: 'optica',
        component: OpticavistasComponent
    }
];
