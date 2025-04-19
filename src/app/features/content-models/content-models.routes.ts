import { Routes } from '@angular/router';
import { ContentModelEditorComponent } from './components/content-model-editor/content-model-editor.component';
import { ContentModelListComponent } from './components/content-model-list/content-model-list.component';
import { ContentModelCreateComponent } from './components/modal/content-model-create/content-model-create.component';
import { ContentModelFieldCreatorComponent } from './components/modal/content-model-field-creator/content-model-field-creator.component';
import { ContentModelFieldEditorComponent } from './components/modal/content-model-field-editor/content-model-field-editor.component';
import { provideState } from '@ngrx/store';
import { contentModelCreationFeature } from './store/contentModelCreationFeature';
import { provideEffects } from '@ngrx/effects';
import { ContentModelCreationEffects } from './store/content-model-creation.effects';
import { userModelsListFeature } from './components/content-model-list/store/ModelListState';
import { UserModelListEffects } from './components/content-model-list/store/user-model-list.effects';

export const CONTENT_MODELS_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideState(contentModelCreationFeature),
      provideEffects(ContentModelCreationEffects),
    ],
    children: [
      {
        path: '',
        component: ContentModelListComponent,
        providers: [
          provideState(userModelsListFeature),
          provideEffects(UserModelListEffects),
        ],
      },
      {
        path: 'create',
        component: ContentModelCreateComponent,
        outlet: 'modal',
      },
      {
        path: 'create-field',
        component: ContentModelFieldCreatorComponent,
        outlet: 'modal',
      },
      {
        path: 'edit-field',
        component: ContentModelFieldEditorComponent,
        outlet: 'modal',
      },
      { path: 'edit/new', component: ContentModelEditorComponent },
      { path: 'edit/:id', component: ContentModelEditorComponent },
    ],
  },
];
