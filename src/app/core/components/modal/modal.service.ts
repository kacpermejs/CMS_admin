import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class ModalService {
  constructor(private router: Router, private route: ActivatedRoute) {}

  close() {
    this.router.navigate(
      [{ outlets: { modal: null } }],
      { relativeTo: this.route }
    );
  }
}