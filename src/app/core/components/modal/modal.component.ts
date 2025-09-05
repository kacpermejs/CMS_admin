import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, RouterModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  router = inject(Router);
  currentActivatedRoute = inject(ActivatedRoute);

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
      { relativeTo: this.currentActivatedRoute.parent }
    );
  }
}
