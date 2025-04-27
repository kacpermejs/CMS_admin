import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-entry-editor',
  imports: [],
  templateUrl: './entry-editor.component.html',
  styleUrl: './entry-editor.component.css'
})
export class EntryEditorComponent {
  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && id !== 'new') {
        //this.store.dispatch();
      }
    });
  }
}
