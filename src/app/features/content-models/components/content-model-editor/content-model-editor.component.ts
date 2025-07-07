import { Component, HostListener, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentField, ContentModelData } from '../../models/ContentModel';
import { selectContentModelData } from 'app/features/content-models/store/content-model.selectors';
import { addContentField, deleteModelField, loadContentModel, saveContentModel, updateField } from '../../store/content-model-creation.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { selectIsSynchronized } from '../../store/contentModelCreationFeature';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-content-model-editor',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, MenuModule],
  templateUrl: './content-model-editor.component.html',
  styleUrl: './content-model-editor.component.css',
})
export class ContentModelEditorComponent {
  menuMap = new Map<string, MenuItem[]>();

  model$: Observable<ContentModelData>;
  synced$: Observable<boolean>;

  store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.model$ = this.store.select(selectContentModelData);
    this.synced$ = this.store.select(selectIsSynchronized);

    this.model$.subscribe((model) => {
      this.menuMap.clear();
      model.fields.forEach((field) => {
        this.menuMap.set(field.id, this.createMenuItems(field));
      });
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id && id !== 'new') {
        this.store.dispatch(loadContentModel({ id }));
      }
    });
  }

  private createMenuItems(item: ContentField): MenuItem[] {
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.editField(item),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteField(item),
      },
    ];
  }

  deleteField(item: ContentField): void {
    this.store.dispatch(deleteModelField({id: item.id}));
  }

  save() {
    this.store.dispatch(saveContentModel());
  }

  editField(item: ContentField) {
    this.router.navigate([{ outlets: { modal: ['edit-field'] } }], {
      relativeTo: this.route.parent,
      state: { field: item },
    });
  }

  addField() {
    this.router.navigate([{ outlets: { modal: ['create-field'] } }], {
      relativeTo: this.route.parent,
    });
  }

  onFieldChange(fieldId: string, fieldKey: string, event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    if (target) {
      this.store.dispatch(
        updateField({ id: fieldId, changes: { [fieldKey]: target.value } })
      );
    }
  }
}
