import { Routes } from '@angular/router';
import { ContentModelEditorComponent } from './components/content-model-editor/content-model-editor.component';
import { ContentModelListComponent } from './components/content-model-list/content-model-list.component';
import { ContentModelCreateComponent } from './components/content-model-create/content-model-create.component';

export const CONTENT_MODEL_ROUTES: Routes = [
  { path: '', component: ContentModelListComponent },
  { path: 'create', component: ContentModelCreateComponent, outlet: "modal", pathMatch: 'full'},
  { path: 'edit/new', component: ContentModelEditorComponent },
  { path: 'edit/:id', component: ContentModelEditorComponent },
];
