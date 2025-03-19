import { Component, inject } from '@angular/core';
import { ContentModel, ContentModelCreatorService } from './services/content-model-creator/content-model-creator.service';
import { Store } from '@ngrx/store';
import { selectUserAuthState, selectUserUid } from '@core/store/selectors/user.selectors';
import { map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FieldValue, Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-content-models',
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './content-models.component.html',
  styleUrl: './content-models.component.css',
})
export class ContentModelsComponent {
  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);
  private contentService = inject(ContentModelCreatorService);
  models$: Observable<ContentModel[]>

  modalRoutes = ['/edit/', '/add']

  constructor() {
    this.models$ = this.loadModels();
  }

  ngOnInit(): void {
  }

  convertToRelativeTime(date: Timestamp | FieldValue): string {
    if (!(date instanceof Timestamp))
      return 'N/A'
    const now = new Date();
    const diffInMilliseconds = now.getTime() - (date.toDate().getTime());
    
    const diffInSeconds = diffInMilliseconds / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInMonths = diffInDays / 30;  // Approximation: 30 days per month
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
    this.router.navigate(['add'], {relativeTo: this.route})
  }

  isModalActive(): boolean {
    return this.modalRoutes.some(url => {
      return this.router.url.includes(url);
    });
  }

  openEditModal(model: ContentModel) {
    this.router.navigate(['edit', model.id], { relativeTo: this.route }); // Open modal
  }

  closeModal() {
    this.router.navigate(this.route.snapshot.url); // Navigate back to list
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

  loadModels() {
    return this.withUid()
      .pipe(switchMap((uid) => this.contentService.getUserModels(uid)));
  }

  createModel() {
    this.withUid()
      .pipe(
        switchMap((uid) =>
          this.contentService.createContentModel(
            uid,
            'BlogPost',
            [
              { id: 'title', name: 'Title', type: 'Text', required: true },
              {
                id: 'content',
                name: 'Content',
                type: 'RichText',
                required: true,
              },
            ]
          )
        )
      )
      .subscribe(() => {
        console.log('Content Model Created!');
        this.loadModels();
      });
  }

  addEntry() {
    this.withUid()
      .pipe(
        switchMap((uid) =>
          this.contentService.addContentEntry(
            'BlogPost',
            {
              title: 'My First Blog',
              content: 'This is the content of my first blog.',
              author: 'John Doe',
            },
            uid
          )
        )
      )
      .subscribe(() => {
        console.log('Entry Added!');
      });
  }
}
