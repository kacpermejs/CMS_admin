import { Component, Host, inject, SkipSelf } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { createContentModel } from '../../../store/content-model-creation.actions';
import { ModalComponent } from "../../../../../core/components/modal/modal.component";
import { ButtonModule } from 'primeng/button';
import { ModalService } from '@core/components/modal/modal.service';

@Component({
  selector: 'app-content-model-create',
  imports: [CommonModule, ReactiveFormsModule, ModalComponent, ButtonModule],
  templateUrl: './content-model-create.component.html',
  styleUrl: './content-model-create.component.css',
})
export class ContentModelCreateComponent {
  protected router = inject(Router);
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private fb = inject(FormBuilder);
  public modalService = inject(ModalService, { skipSelf: true });

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.maxLength(200)]],
    });
  }

  modalParent() {
    return this.route.parent;
  }

  createModel() {
    const { name, description } = this.form.value;

    this.store.dispatch(createContentModel({ name, description }));
    this.modalService.result(true).close().then((result) => {
      if(result) {
        this.router.navigate(
          [
            {
              outlets: {
                primary: ['edit', 'new'],
              },
            },
          ],
          { relativeTo: this.route.parent }
        );
      }
    });
  }
}
