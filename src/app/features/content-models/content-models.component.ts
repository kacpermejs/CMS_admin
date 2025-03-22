import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-models',
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './content-models.component.html',
  styleUrl: './content-models.component.css',
})
export class ContentModelsComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);

  isModalActive(): boolean {
    return this.router.url.includes('modal:');
  }

  closeModal() {
    this.router.navigate(
      [
        {
          outlets: {
            modal: null
          }
        }
      ],
      { relativeTo: this.route }
    );
  }
}
