import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { createContentModel } from '../../../store/content-model-creation.actions';
import { ModalComponent } from "../../../../../core/components/modal/modal.component";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-content-model-create',
  imports: [CommonModule, ReactiveFormsModule, ModalComponent, ButtonModule],
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

  modalParent() {
    return this.route.parent;
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
      { relativeTo: this.modalParent() }
    );
  }
}
