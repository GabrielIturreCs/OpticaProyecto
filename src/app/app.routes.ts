import { Routes } from '@angular/router';
import { OpticavistasComponent } from './componentes/opticavistas/opticavistas.component';

export const routes: Routes = [
  {
    path: '',
    component: OpticavistasComponent
  },
  {
    path: 'optica',
    component: OpticavistasComponent
  }
];