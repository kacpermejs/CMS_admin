import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ContentChild, effect, ElementRef, inject, Input, OnDestroy, OnInit, signal, viewChild, ViewChild } from '@angular/core';
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
  modalService = inject(ModalService, { skipSelf: true });

  @Input({ required: false })
  onClosed?: () => void;

  footer = viewChild<ElementRef>('footer');

  hasFooter = signal(false);

  constructor() {
    effect(() => {
      const el = this.footer();
      this.hasFooter.set(!!el && el.nativeElement.children.length > 0);
    });
  }

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
    this.modalService.close();
  }
}
