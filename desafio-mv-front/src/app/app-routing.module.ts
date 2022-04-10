import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormColaboradorComponent } from './form-colaborador/form-colaborador.component';
import { FormItemComponent } from './form-item/form-item.component';
import { ListColaboradorComponent } from './list-colaborador/list-colaborador.component';
import { ListItemComponent } from './list-item/list-item.component';



const routes: Routes = [

  // // redireciona para o add task
  { path: '', redirectTo: '/lista-item', pathMatch: 'full' },
  // // rota de criar colaborador
  { path: 'lista-item', component: ListItemComponent },
  { path: 'cadastro-colaborador', component: FormColaboradorComponent },

  { path: 'lista-colaborador', component: ListColaboradorComponent },

  { path: 'cadastro-item', component: FormItemComponent },


  // //caso seja uma rota desconhecida
  // { path: '**', component: null }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
