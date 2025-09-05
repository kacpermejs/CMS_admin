import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxFormInputComponent } from "app/shared/components/forms/checkbox-form-input/checkbox-form-input.component";
import { CommonModule } from '@angular/common';
import { SettingsFormBase } from '../settingsFormComponentBase';

@Component({
  selector: 'app-short-text-settings-form',
  imports: [CheckboxFormInputComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './short-text-settings-form.component.html',
  styleUrl: './short-text-settings-form.component.css'
})
export class ShortTextSettingsFormComponent extends SettingsFormBase {
  override createSettingsGroup(): FormGroup {
    return this.fb.group({
      fieldOptions: this.fb.group({
        enableLocalization: [false],
        entryTitle: [false],
      }),
    });
  }
}
