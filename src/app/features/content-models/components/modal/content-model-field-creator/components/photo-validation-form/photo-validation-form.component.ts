import { Component } from '@angular/core';
import { ValidationComponentBase as ValidationFormComponentBase } from '../validation-component-base';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxFormInputComponent } from 'app/shared/components/checkbox-form-input/checkbox-form-input.component';

@Component({
  selector: 'app-photo-validation-form',
  imports: [ReactiveFormsModule, CheckboxFormInputComponent],
  templateUrl: './photo-validation-form.component.html',
  styleUrl: './photo-validation-form.component.css'
})
export class PhotoValidationFormComponent extends ValidationFormComponentBase {

}
