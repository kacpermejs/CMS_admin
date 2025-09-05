import { Component, Input } from '@angular/core';
import { SimpleFormInputBase } from '../form-input-base/SimpleFormInputBase';
import { FORM_INPUT_BASE_VIEW_PROVIDERS } from '../form-input-base/FORM_INPUT_BASE_VIEW_PROVIDERS';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-short-text-form-input',
  imports: [ReactiveFormsModule],
  templateUrl: './short-text-form-input.component.html',
  styleUrl: './short-text-form-input.component.css',
  viewProviders: [
    ...FORM_INPUT_BASE_VIEW_PROVIDERS
  ]
})
export class ShortTextFormInputComponent extends SimpleFormInputBase {
  @Input({required: false}) placeholder: string = '';
}
