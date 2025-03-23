import { CommonModule } from '@angular/common';
import { Component, Host, inject, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalFor } from './modal-for';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, RouterModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  router = inject(Router);
  currentActivatedRoute = inject(ActivatedRoute);

  @Input()
  parentRoute: ActivatedRoute | null = null;

  constructor(@Host() @Optional() private modalFor: ModalFor) {
    
  }

  ngOnInit(): void {
    // console.log("this.modalFor");
    // console.log(this.modalFor);
    // if (!this.parentRoute && this.modalFor) {
    //   this.parentRoute = this.modalFor.modalParent();
    // }
  }

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
      { relativeTo: this.parentRoute ? this.parentRoute : this.currentActivatedRoute }
    );
  }
}
