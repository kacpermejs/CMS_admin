import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ContentModel } from '../../models/ContentModel';
import { CommonModule } from '@angular/common';
import { loadUserModels, selectUserModels } from './store/ModelListState';
import { RelativeTimePipe } from 'app/shared/utils/RelativeTimePipe';
import { deleteContentModel } from '../../store/content-model-creation.actions';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-content-model-list',
  providers: [
    ConfirmationService
  ],
  imports: [
    CommonModule,
    RouterModule,
    RelativeTimePipe,
    ButtonModule,
    MenuModule,
    ConfirmDialogModule
  ],
  templateUrl: './content-model-list.component.html',
  styleUrl: './content-model-list.component.css',
})
export class ContentModelListComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);
  models$: Observable<ContentModel[]>;

  menuMap = new Map<string, MenuItem[]>();
  confirmService = inject(ConfirmationService);

  constructor() {
    this.models$ = this.store.select(selectUserModels);

    this.models$.subscribe((models) => {
      this.menuMap.clear();
      models.forEach((item) => {
        this.menuMap.set(item.id, this.createMenuItems(item));
      });
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadUserModels());
  }

  private createMenuItems(item: ContentModel): MenuItem[] {
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.onEdit(item),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.confirmService.confirm({
            header: 'Confirm deletion',
            message:`
              Are you sure you want to delete that model and all its entries?
            `,
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.onDelete(item),
          })
        }
      },
    ];
  }

  onEdit(model: ContentModel) {
    this.router.navigate(['edit', model.id], { relativeTo: this.route });
  }

  onDelete(model: ContentModel) {
    this.store.dispatch(deleteContentModel({ id: model.id }));
  }

  onNewModel() {
    this.router.navigate([{ outlets: { modal: ['create'] } }], {
      relativeTo: this.route,
    });
  }
}
