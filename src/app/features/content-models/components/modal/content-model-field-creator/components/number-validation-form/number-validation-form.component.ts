import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxFormInputComponent } from "app/shared/components/checkbox-form-input/checkbox-form-input.component";
import { ValidationComponentBase } from '../validation-component-base';

@Component({
  selector: 'app-number-validation-form',
  imports: [CheckboxFormInputComponent, ReactiveFormsModule],
  templateUrl: './number-validation-form.component.html',
  styleUrl: './number-validation-form.component.css'
})
export class NumberValidationFormComponent extends ValidationComponentBase {
  
}
