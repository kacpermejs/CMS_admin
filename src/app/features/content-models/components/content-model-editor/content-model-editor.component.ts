import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentField, ContentModelData } from '../../models/ContentModel';
import { selectContentModelData } from 'app/features/content-models/store/content-model.selectors';
import {
  deleteModelField,
  loadContentModel,
  saveContentModel,
  updateField,
} from '../../store/content-model-creation.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { selectIsSynchronized } from '../../store/contentModelCreationFeature';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

export enum ActionType {
  Added,
  Deleted,
  Modified,
  Renamed,
}

export interface ModelFieldChange {
  action: ActionType;
  field: ContentField;
}

@Component({
  selector: 'app-content-model-editor',
  providers: [ConfirmationService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    MenuModule,
    ConfirmDialogModule,
  ],
  templateUrl: './content-model-editor.component.html',
  styleUrl: './content-model-editor.component.css',
})
export class ContentModelEditorComponent {
  menuMap = new Map<string, MenuItem[]>();
  confirmationService = inject(ConfirmationService);

  model$: Observable<ContentModelData>;
  synced$: Observable<boolean>;

  store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private changes: ModelFieldChange[] = [];
  private unsavedChanges: ModelFieldChange[] = [];

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

  save() {
    const deletedFields = this.unsavedChanges
      .filter((c) => c.action === ActionType.Deleted) //breaking changes
      .map(
        (c) =>
          `<li class="text-red-600 ml-5 list-disc">Deleted ${c.field.name}</li>`
      )
      .join('');

    const noBreakingChanges = deletedFields.length <= 0;

    if (noBreakingChanges) {
      this.store.dispatch(saveContentModel());
      return;
    } else {
      this.confirmationService.confirm({
        header: 'Are you sure you want to save?',
        message: `
          Breaking changes:<br>
          <ul>${deletedFields}</ul>
        `,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.unsavedChanges = [];
          this.store.dispatch(saveContentModel());
        },
      });
    }
  }

  private saveHistory(action: ActionType, item: ContentField) {
    this.changes.push({ action, field: item });
    this.unsavedChanges.push({ action, field: item });
  }

  deleteField(item: ContentField): void {
    this.store.dispatch(deleteModelField({ id: item.id }));

    this.saveHistory(ActionType.Deleted, item);
  }

  editField(item: ContentField) {
    this.router.navigate([{ outlets: { modal: ['edit-field'] } }], {
      relativeTo: this.route.parent,
      state: { field: item },
    });
  }

  addField() {
    //TODO add history tracking
    this.router.navigate([{ outlets: { modal: ['create-field'] } }], {
      relativeTo: this.route.parent,
    });
  }

  onFieldChange(fieldId: string, fieldKey: string, event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    if (target) {
      //TODO
      //this.saveHistory(ActionType.Modified, item);
      this.store.dispatch(
        updateField({ id: fieldId, changes: { [fieldKey]: target.value } })
      );
    }
  }
}
