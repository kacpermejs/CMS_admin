import { Component } from '@angular/core';
import { FORM_INPUT_BASE_VIEW_PROVIDERS } from '../form-input-base/FORM_INPUT_BASE_VIEW_PROVIDERS';
import { SimpleFormInputBase } from '../form-input-base/SimpleFormInputBase';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-photo-form-input',
  imports: [ReactiveFormsModule],
  templateUrl: './photo-form-input.component.html',
  styleUrl: './photo-form-input.component.css',
    viewProviders: [...FORM_INPUT_BASE_VIEW_PROVIDERS],
})
export class PhotoFormInputComponent extends SimpleFormInputBase {

}
