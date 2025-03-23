import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentModelData } from '../../models/ContentModel';
import { selectContentModelData, selectContentModelSynced } from '@core/store/selectors/content-model.selectors';
import { addContentField, loadContentModel, saveContentModel, updateField } from '@core/store/actions/content-model-creation.actions';
import { ActivatedRoute, Router } from '@angular/router';

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
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.model$ = this.store.select(selectContentModelData);
    this.synced$ = this.store.select(selectContentModelSynced);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log('params');
      const id = params.get('id');
      console.log(id);
      if (id && id !== 'new') {
        this.store.dispatch(loadContentModel({ id }));
      }
    });
  }

  save() {
    this.store.dispatch(saveContentModel());
  }

  editField() {
    this.router.navigate([{outlets: {modal: ['edit-field']}}], {relativeTo: this.route.parent});
  }

  addField() {
    this.router.navigate([{outlets: {modal: ['create-field']}}], {relativeTo: this.route.parent});
  }

  onFieldChange(fieldId: string, fieldKey: string, event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    if (target) {
      this.store.dispatch(updateField({ id: fieldId, changes: { [fieldKey]: target.value } }));
    }
  }
}
