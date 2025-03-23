import { Routes } from '@angular/router';
import { ContentModelEditorComponent } from './components/content-model-editor/content-model-editor.component';
import { ContentModelListComponent } from './components/content-model-list/content-model-list.component';
import { ContentModelCreateComponent } from './components/content-model-create/content-model-create.component';
import { ContentModelFieldCreatorComponent } from './components/content-model-field-creator/content-model-field-creator.component';
import { ContentModelFieldEditorComponent } from './components/content-model-field-editor/content-model-field-editor.component';

export const CONTENT_MODEL_ROUTES: Routes = [
  { path: '', component: ContentModelListComponent },
  { path: 'create', component: ContentModelCreateComponent, outlet: "modal", pathMatch: 'full'},
  { path: 'create-field', component: ContentModelFieldCreatorComponent, outlet: "modal", pathMatch: 'full'},
  { path: 'edit-field', component: ContentModelFieldEditorComponent, outlet: "modal", pathMatch: 'full'},
  { path: 'edit/new', component: ContentModelEditorComponent },
  { path: 'edit/:id', component: ContentModelEditorComponent },
];
