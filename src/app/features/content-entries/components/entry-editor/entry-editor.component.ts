import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadContentModel, loadEntry } from '../../store/entry-creation.actions';
import { selectContentModel, selectValues } from '../../store/entry-creation.feature';
import { tap } from 'rxjs';

@Component({
  selector: 'app-entry-editor',
  imports: [],
  templateUrl: './entry-editor.component.html',
  styleUrl: './entry-editor.component.css'
})
export class EntryEditorComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);

  values$ = this.store.select(selectValues).pipe(
    tap( v => console.log('Values: ', v))
  );
  model$ = this.store.select(selectContentModel).pipe(
    tap( m => console.log('Model: ', m))
  );

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      const modelId = queryParams.get('modelId');
      if (modelId) {
        this.store.dispatch(loadContentModel({modelId}))
      } else {

      }
    });

    this.route.paramMap.subscribe(params => {
      const entryId = params.get('id');
      if (entryId && entryId !== 'new') {
        this.store.dispatch(loadEntry({entryId: entryId}));
      } else {
        
      }
    });
  }
}
