import { Component, inject, OnInit } from '@angular/core';
import { FieldValue, Timestamp } from '@angular/fire/firestore';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ContentModel } from '../../models/ContentModel';
import { CommonModule } from '@angular/common';
import { loadUserModels, selectUserModels } from './store/ModelListState';
import { RelativeTimePipe } from 'app/shared/utils/RelativeTimePipe';
import { deleteContentModel } from '../../store/content-model-creation.actions';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-content-model-list',
  imports: [CommonModule, RouterModule, RelativeTimePipe, ButtonModule],
  templateUrl: './content-model-list.component.html',
  styleUrl: './content-model-list.component.css',
})
export class ContentModelListComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);
  models$: Observable<ContentModel[]>;

  constructor() {
    this.models$ = this.store.select(selectUserModels);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUserModels());
  }

  onEdit(model: ContentModel) {
    this.router.navigate(['edit', model.id], { relativeTo: this.route });
  }

  onDelete(model: ContentModel) {
    this.store.dispatch(deleteContentModel({id: model.id}));
  }

  onNewModel() {
    this.router.navigate([{ outlets: { modal: ['create'] } }], {
      relativeTo: this.route,
    });
  }
}
