import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Forms Components',
      status: false
    },
    children: [
      {
        path: 'forms/basic',
        loadChildren: () => import('./basic-elements/basic-elements.module').then(m => m.BasicElementsModule)
      },
      {
        path: 'forms/add-on',
        loadChildren: () => import('./add-on/add-on.module').then(m => m.AddOnModule)
      },
      {
        path: 'forms/advance',
        loadChildren: () => import('./advance-elements/advance-elements.module').then(m => m.AdvanceElementsModule)
      },
      {
        path: 'forms/validation',
        loadChildren: () => import('./frm-validation/frm-validation.module').then(m => m.FrmValidationModule)
      },
      {
        path: 'picker',
        loadChildren: () => import('./form-picker/form-picker.module').then(m => m.FormPickerModule)
      },
      {
        path: 'mask',
        loadChildren: () => import('./form-mask/form-mask.module').then(m => m.FormMaskModule)
      },
      {
        path: 'select',
        loadChildren: () => import('./form-select/form-select.module').then(m => m.FormSelectModule)
      },
      {
        path: 'form-wizards',
        loadChildren: () => import('./form-wizards/form-wizards.module').then(m => m.FormWizardsModule)
      },
      {
        path: 'ngx',
        loadChildren: () => import('./ngx-wizard/ngx-wizard.module').then(m => m.NGXFormWizardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
