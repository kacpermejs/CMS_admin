import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ModalService {
  private resultResolver?: (value: any) => void;
  private storedResult?: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  open(path: string, options?: NavigationExtras): Promise<any> {
    return new Promise<any>((resolve) => {
      this.resultResolver = resolve;

      this.router.navigate([{ outlets: { modal: path } }], {
        ...options,
        relativeTo: this.route,
        queryParamsHandling:
          options?.queryParamsHandling !== undefined
            ? options?.queryParamsHandling
            : 'preserve',
      });
    });
  }

  result(value: any): this {
    this.storedResult = value;
    return this;
  }

  async close(options?: NavigationExtras): Promise<any> {
    return this.router
      .navigate([{ outlets: { modal: null } }], {
        ...options,
        relativeTo: this.route,
        queryParamsHandling:
          options?.queryParamsHandling !== undefined
            ? options?.queryParamsHandling
            : 'preserve',
      })
      .then((ok) => {
        if (ok && this.resultResolver) {
          this.resultResolver(this.storedResult);
          this.resultResolver = undefined;
          this.storedResult = undefined; // reset after use
        }
        return this.storedResult;
      });
  }
}
