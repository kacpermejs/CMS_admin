import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

export interface NavigationOptions {
  queryParamsHandling?: 'preserve' | 'merge' | null | undefined;
  state?: {
    [k: string]: any;
  };
}

@Injectable()
export class ModalService {
  constructor(private router: Router, private route: ActivatedRoute) {}

  close() {
    return this.router.navigate([{ outlets: { modal: null } }], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve'
    });
  }

  open(path: string, options?: NavigationExtras) {
    this.router.navigate([{ outlets: { modal: path } }], {
      ...options,
      relativeTo: this.route,
      queryParamsHandling: options?.queryParamsHandling ? options?.queryParamsHandling : 'preserve' //preserve by default not like in built-in
    });
  }
}