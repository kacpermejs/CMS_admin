import { Routes } from '@angular/router';
import { ContentModelEditorComponent } from './components/content-model-editor/content-model-editor.component';
import { ContentModelViewerComponent } from './components/content-model-viewer/content-model-viewer.component';

export const CONTENT_MODEL_ROUTES: Routes = [
  { path: 'add', component: ContentModelEditorComponent },
  { path: 'edit/:id', component: ContentModelViewerComponent },
];
