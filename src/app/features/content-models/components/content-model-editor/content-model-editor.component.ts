import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentModelData } from '../../models/ContentModel';
import { selectContentModelData, selectContentModelSynced } from '@core/store/selectors/content-model.selectors';
import { addContentField } from '@core/store/actions/content-model-creation.actions';

@Component({
  selector: 'app-content-model-editor',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './content-model-editor.component.html',
  styleUrl: './content-model-editor.component.css',
})
export class ContentModelEditorComponent {

  model$: Observable<ContentModelData>;
  synced$: Observable<boolean>;

  store = inject(Store);

  constructor() {
    this.model$ = this.store.select(selectContentModelData);
    this.synced$ = this.store.select(selectContentModelSynced);
  }

  save() {
    console.log('Saving model!'); //TODO
  }

  addField() {
    this.store.dispatch(addContentField({field: {type: 'Text', name: "Name", id: '', required: false}}));
  }
}
