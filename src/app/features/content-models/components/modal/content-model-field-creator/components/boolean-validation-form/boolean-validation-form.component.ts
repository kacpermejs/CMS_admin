import { Component } from '@angular/core';
import { ValidationComponentBase } from '../validation-component-base';
import { CheckboxFormInputComponent } from "app/shared/components/forms/checkbox-form-input/checkbox-form-input.component";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-boolean-validation-form',
  imports: [CheckboxFormInputComponent, ReactiveFormsModule],
  templateUrl: './boolean-validation-form.component.html',
  styleUrl: './boolean-validation-form.component.css'
})
export class BooleanValidationFormComponent extends ValidationComponentBase {

}
