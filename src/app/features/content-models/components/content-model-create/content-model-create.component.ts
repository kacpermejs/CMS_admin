import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { createContentModel } from '@core/store/actions/content-model-creation.actions';

@Component({
  selector: 'app-content-model-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './content-model-create.component.html',
  styleUrl: './content-model-create.component.css',
})
export class ContentModelCreateComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.maxLength(200)]],
    });
  }

  createModel() {
    console.log('create');
    const { name, description } = this.form.value;

    this.store.dispatch(createContentModel({ name, description }));
    this.router.navigate(
      [
        {
          outlets: {
            primary: ['edit', 'new'],
            modal: null
          }
        }
      ],
      { relativeTo: this.route.parent }
    );
  }
}
