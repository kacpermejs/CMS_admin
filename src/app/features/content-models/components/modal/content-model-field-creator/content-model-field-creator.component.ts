import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentField, ContentType } from '../../../models/ContentModel';
import { Store } from '@ngrx/store';
import { addContentField } from '../../../store/content-model-creation.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from "../../../../../core/components/modal/modal.component";
import { CheckboxFormInputComponent } from 'app/shared/components/forms/checkbox-form-input/checkbox-form-input.component';
import { ButtonModule } from 'primeng/button';
import { BooleanValidationFormComponent } from "./components/boolean-validation-form/boolean-validation-form.component";
import { NumberValidationFormComponent } from "./components/number-validation-form/number-validation-form.component";
import { ShortTextValidationFormComponent } from "./components/short-text-validation-form/short-text-validation-form.component";
import { ShortTextSettingsFormComponent } from "./components/short-text-settings-form/short-text-settings-form.component";
import { NumberSettingsFormComponent } from "./components/number-settings-form/number-settings-form.component";
import { BooleanSettingsFormComponent } from "./components/boolean-settings-form/boolean-settings-form.component";
import { PhotoSettingsFormComponent } from "./components/photo-settings-form/photo-settings-form.component";
import { PhotoValidationFormComponent } from "./components/photo-validation-form/photo-validation-form.component";
import { ModalService } from '@core/components/modal/modal.service';

@Component({
  selector: 'app-content-model-field-creator',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalComponent,
    ButtonModule,
    BooleanValidationFormComponent,
    NumberValidationFormComponent,
    ShortTextValidationFormComponent,
    ShortTextSettingsFormComponent,
    NumberSettingsFormComponent,
    BooleanSettingsFormComponent,
    PhotoSettingsFormComponent,
    PhotoValidationFormComponent,
  ],
  templateUrl: './content-model-field-creator.component.html',
  styleUrl: './content-model-field-creator.component.css',
})
export class ContentModelFieldCreatorComponent {

  form: FormGroup;
  types = ContentType;
  typeIconMapping = {
    [ContentType.Boolean]: 'pi pi-check-square',
    [ContentType.Number]: 'pi pi-hashtag',
    [ContentType.Text]: 'pi pi-align-left',
    [ContentType.Photo]: 'pi pi-image',
  };

  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);
  modalService = inject(ModalService);

  constructor(private fb: FormBuilder) {
    // Initialize the form with default values
    this.form = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      id: ['', Validators.required],
      metadata: this.fb.group({}),
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

  getContentIcon(key: string): string {
    return this.typeIconMapping[key as ContentType]
  }

  get metadataGroup(): FormGroup | null {
    return this.form.get('metadata') as FormGroup | null;
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
    this.modalService.result(true).close();
  }
}
