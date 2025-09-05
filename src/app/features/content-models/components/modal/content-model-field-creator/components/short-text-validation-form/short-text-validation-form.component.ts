import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxFormInputComponent } from "app/shared/components/forms/checkbox-form-input/checkbox-form-input.component";
import { ValidationComponentBase } from '../validation-component-base';

@Component({
  selector: 'app-short-text-validation-form',
  imports: [CheckboxFormInputComponent, ReactiveFormsModule],
  templateUrl: './short-text-validation-form.component.html',
  styleUrl: './short-text-validation-form.component.css'
})
export class ShortTextValidationFormComponent extends ValidationComponentBase {

}
