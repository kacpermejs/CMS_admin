import { Component, inject } from '@angular/core';
import { FieldValue, Timestamp } from '@angular/fire/firestore';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap } from 'rxjs';
import { ContentModelCreatorService } from '../../services/content-model-creator/content-model-creator.service';
import { ContentModel } from '../../models/ContentModel';
import { selectUserUid } from '@core/store/selectors/user.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-model-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './content-model-list.component.html',
  styleUrl: './content-model-list.component.css',
})
export class ContentModelListComponent {
  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);
  private contentService = inject(ContentModelCreatorService); //TODO don't
  models$: Observable<ContentModel[]>;

  constructor() {
    this.models$ = this.loadModels();
  }

  openEditModal(model: ContentModel) {
    this.router.navigate(['edit', model.id], { relativeTo: this.route }); // Open modal
  }

  convertToRelativeTime(date: Timestamp | FieldValue): string {
    if (!(date instanceof Timestamp)) return 'N/A';
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.toDate().getTime();

    const diffInSeconds = diffInMilliseconds / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInMonths = diffInDays / 30; // Approximation: 30 days per month
    const diffInYears = diffInDays / 365;

    if (diffInSeconds < 60) {
      return `${Math.floor(diffInSeconds)} seconds ago`;
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInDays < 30) {
      return `${Math.floor(diffInDays)} days ago`;
    } else if (diffInMonths < 12) {
      return `${Math.floor(diffInMonths)} months ago`;
    } else {
      return `${Math.floor(diffInYears)} years ago`;
    }
  }

  onAdd() {
    this.router.navigate([{ outlets: { modal: ['create'] } }], {
      relativeTo: this.route,
    });
  }

  loadModels() { //TODO use just ngrx
    return this.withUid().pipe(
      switchMap((uid) => this.contentService.getUserModels(uid))
    );
  }

  getUser() {
    return this.store.select(selectUserUid);
  }

  private withUid(): Observable<string> {
    return this.getUser().pipe(
      map((uid) => {
        if (!uid) throw new Error('Not Authenticated!');
        return uid;
      })
    );
  }
}
