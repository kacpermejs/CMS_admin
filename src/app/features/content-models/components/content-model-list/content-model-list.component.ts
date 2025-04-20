import { Component, inject, OnInit } from '@angular/core';
import { FieldValue, Timestamp } from '@angular/fire/firestore';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ContentModel } from '../../models/ContentModel';
import { CommonModule } from '@angular/common';
import { loadUserModels, selectUserModels } from './store/ModelListState';
import { RelativeTimePipe } from 'app/shared/utils/RelativeTimePipe';

@Component({
  selector: 'app-content-model-list',
  imports: [CommonModule, RouterModule, RelativeTimePipe],
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

  openEditModal(model: ContentModel) {
    this.router.navigate(['edit', model.id], { relativeTo: this.route }); // Open modal
  }

  onAdd() {
    this.router.navigate([{ outlets: { modal: ['create'] } }], {
      relativeTo: this.route,
    });
  }
}
