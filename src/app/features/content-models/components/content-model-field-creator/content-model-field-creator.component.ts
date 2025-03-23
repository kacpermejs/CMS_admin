import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentField, ContentTypes } from '../../models/ContentModel';
import { Store } from '@ngrx/store';
import { addContentField } from '@core/store/actions/content-model-creation.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-content-model-field-creator',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './content-model-field-creator.component.html',
  styleUrl: './content-model-field-creator.component.css'
})
export class ContentModelFieldCreatorComponent {
  form: FormGroup;
  types = ContentTypes;

  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor(private fb: FormBuilder) {
    // Initialize the form with default values
    this.form = this.fb.group({
      type: ['', Validators.required],//TODO add enum validator
      name: ['', Validators.required],
      id: ['', Validators.required],
      required: [false]
    });
  }

  ngOnInit(): void {
    // Subscribe to the name field changes
    this.form.get('name')?.valueChanges.subscribe(value => {
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

  typeSelected() {
    const typeField = this.form.get('type');
    return typeField && typeField.valid;
  }

  // Converts string to camelCase
  convertToCamelCase(input: string): string {
    return input
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase())
      .replace(/\s+/g, '');
  }

  // Method to log the form values (for testing)
  onSubmit() {

    if (this.form.invalid)
      throw new Error('Content field creation form invalid!');
    const newField: ContentField = {...this.form.value};

    this.store.dispatch(addContentField({field: newField}));
    this.router.navigate([{outlets: {modal: null}}], {relativeTo: this.route.parent});
  }
}
