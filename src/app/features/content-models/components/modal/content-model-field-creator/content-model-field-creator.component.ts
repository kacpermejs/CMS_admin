import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentField, ContentType } from '../../../models/ContentModel';
import { Store } from '@ngrx/store';
import { addContentField } from '../../../store/content-model-creation.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from "../../../../../core/components/modal/modal.component";
import { CheckboxFormInputComponent } from 'app/shared/components/checkbox-form-input/checkbox-form-input.component';
import { ButtonModule } from 'primeng/button';

function buildTextFieldMetadataForm(): FormGroup {
  return new FormGroup({
    validation: new FormGroup({
      required: new FormControl(false),
    }),
    settings: new FormGroup({
      fieldOptions: new FormGroup({
        enableLocalization: new FormControl(false),
        entryTitle: new FormControl(false),
      })
    })
  });
}

function buildRichTextFieldMetadataForm(): FormGroup {
  return new FormGroup({})
}

function buildNumberFieldMetadataForm(): FormGroup {
  return new FormGroup({})
}

function buildBooleanFieldMetadataForm(): FormGroup {
  return new FormGroup({})
}

const fieldMetadataFormBuilders: Record<ContentType, () => FormGroup> = {
  [ContentType.Text]: buildTextFieldMetadataForm,
  [ContentType.RichText]: buildRichTextFieldMetadataForm,
  [ContentType.Number]: buildNumberFieldMetadataForm,
  [ContentType.Boolean]: buildBooleanFieldMetadataForm,
};

@Component({
  selector: 'app-content-model-field-creator',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalComponent,
    CheckboxFormInputComponent,
    ButtonModule
  ],
  templateUrl: './content-model-field-creator.component.html',
  styleUrl: './content-model-field-creator.component.css',
})
export class ContentModelFieldCreatorComponent {
  form: FormGroup;
  types = ContentType;

  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor(private fb: FormBuilder) {
    // Initialize the form with default values

    this.form = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      id: ['', Validators.required],
    });

    this.form.get('type')?.valueChanges.subscribe((selectedType) => {
      this.addTypeSpecificForm(selectedType);

    });
  }

  ngOnInit(): void {
    // Subscribe to the name field changes
    this.form.get('name')?.valueChanges.subscribe((value) => {
      // Only auto-generate the ID if it is empty and name has not been touched
      const idField = this.form.get('id');
      if (idField && !idField.touched) {
        const camelCaseId = this.convertToCamelCase(value);
        // Mark the ID as touched before updating it programmatically
        idField.setValue(camelCaseId);
        idField.markAsUntouched();
      }
    });
  }

  get metadataGroup(): FormGroup | null {
    return this.form.get('metadata') as FormGroup | null;
  }
  
  get validationGroup(): FormGroup | null {
    return this.metadataGroup?.get('validation') as FormGroup | null;
  }
  
  get settingsGroup(): FormGroup | null {
    return this.metadataGroup?.get('settings') as FormGroup | null;
  }

  get fieldOptionsGroup(): FormGroup | null {
    return this.settingsGroup?.get('fieldOptions') as FormGroup | null;
  }

  addTypeSpecificForm(type: ContentType) {
    if (this.form.contains('metadata')) {
      this.form.removeControl('metadata');
    }
  
    const metadataGroup = this.buildTypeSpecificForm(type);
    this.form.addControl('metadata', metadataGroup);
  }

  buildTypeSpecificForm(type: ContentType): FormGroup {
    const metadataBuilder = fieldMetadataFormBuilders[type];
  
    if (!metadataBuilder) {
      throw new Error(`Unsupported content type: ${type}`);
    }
  
    return metadataBuilder(); // don't wrap again
  }

  modalParent() {
    return this.route.parent;
  }

  typeSelected() {
    const typeField = this.form.get('type');
    return typeField && typeField.valid;
  }

  get selectedType() {
    return this.form.get('type')?.value;
  }

  // Converts string to camelCase
  convertToCamelCase(input: string): string {
    return input
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
        index === 0 ? match.toLowerCase() : match.toUpperCase()
      )
      .replace(/\s+/g, '');
  }

  // Method to log the form values (for testing)
  onSubmit() {
    if (this.form.invalid)
      throw new Error('Content field creation form invalid!');

    const newField: ContentField = {
      ...this.form.value,
    };

    this.store.dispatch(addContentField({ field: newField }));
    this.router.navigate([{ outlets: { modal: null } }], {
      relativeTo: this.route.parent,
    });
  }
}
