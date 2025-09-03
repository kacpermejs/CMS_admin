import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  clearEntry,
  loadContentModel,
  loadEntry,
  saveEntry,
} from '../../store/entry-creation.actions';
import {
  selectContentModel,
  selectValues,
} from '../../store/entry-creation.feature';
import { combineLatest, map, Subject, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ContentModelData,
  ContentType,
  EntryFields,
  TextFieldOptions,
} from 'app/features/content-models/models/ContentModel';
import { CheckboxFormInputComponent } from 'app/shared/components/checkbox-form-input/checkbox-form-input.component';
import { ShortTextFormInputComponent } from 'app/shared/components/short-text-form-input/short-text-form-input.component';
import { NumberFormInputComponent } from 'app/shared/components/number-form-input/number-form-input.component';
import { PhotoFormInputComponent } from 'app/shared/components/photo-form-input/photo-form-input.component';
import { ButtonDirective } from 'primeng/button';

export interface ExistingFile {
  id: string;
  title: string;
  description?: string;
}

export interface NewFile {
  file: File;
  title: string;
  description?: string;
}

@Component({
  selector: 'app-entry-editor',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxFormInputComponent,
    ShortTextFormInputComponent,
    NumberFormInputComponent,
    PhotoFormInputComponent,
    ButtonDirective,
  ],
  templateUrl: './entry-editor.component.html',
  styleUrl: './entry-editor.component.css',
})
export class EntryEditorComponent implements OnInit, OnDestroy {
  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  types = ContentType;

  form: FormGroup;
  modelId: string | null = null;
  entryId: string | null = null;

  constructor() {
    this.form = this.fb.group({});
  }

  values$ = this.store
    .select(selectValues)
    .pipe(tap((v) => console.log('Values: ', v)));
  model$ = this.store
    .select(selectContentModel)
    .pipe(tap((m) => console.log('Model: ', m)));

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.route.queryParamMap.subscribe((queryParams) => {
      const modelId = queryParams.get('modelId');
      this.modelId = modelId;
      if (modelId) {
        this.store.dispatch(loadContentModel({ modelId }));
      } else {
        //TODO handle error 404
      }
    });

    this.route.paramMap.subscribe((params) => {
      const entryId = params.get('id');
      this.entryId = entryId;
      if (entryId && entryId !== 'new') {
        this.store.dispatch(loadEntry({ entryId: entryId }));
      } else {
        this.store.dispatch(clearEntry());
      }
    });

    combineLatest([this.model$, this.values$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([model, values]) => {
        if (!model) return;

        // always rebuild form based on model
        const form = this.fb.group({});
        model.fields.forEach((field) => {
          form.addControl(field.id, this.createControl(field.type));
        });

        // patch values if present
        if (values) {
          form.patchValue(values);
        }

        this.form = form;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  OnSave() {
    if (this.modelId == null || this.entryId == null)
      return;

    const fields: EntryFields = this.form.value;
    console.log(fields);
    
    this.store.dispatch(saveEntry({modelId: this.modelId, entryId: this.entryId, fields }))
  }

  getEntryTitleId(model: ContentModelData): string | undefined {
    return model.fields.find(
      (f) =>
        (f.metadata?.settings?.fieldOptions as TextFieldOptions).entryTitle ==
        true
    )?.id;
  }

  private createControl(type: ContentType): FormControl {
    switch (type) {
      case ContentType.Boolean:
        return this.fb.control<boolean>(false);
      case ContentType.Number:
        return this.fb.control<number | null>(null);
      case ContentType.Text:
        return this.fb.control<string>('');
      case ContentType.Photo:
        return this.fb.control<NewFile | ExistingFile | null>(null);
      default:
        return this.fb.control(null);
    }
  }
}
