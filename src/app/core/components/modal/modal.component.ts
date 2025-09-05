import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, RouterModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnDestroy {
  router = inject(Router);
  currentActivatedRoute = inject(ActivatedRoute);

  @Input({ required: false })
  onClosed?: () => void;

  isModalActive(): boolean {
    return this.router.url.includes('modal:');
  }

  ngOnDestroy(): void {
    console.log('Modal closed');
    if (this.onClosed) {
      this.onClosed();
    }
  }

  closeModal() {
    this.router.navigate(
      [
        {
          outlets: {
            modal: null,
          },
        },
      ],
      { relativeTo: this.currentActivatedRoute.parent }
    );
  }
}
