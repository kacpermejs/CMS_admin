import { Directive, inject } from "@angular/core";
import { ControlContainer, FormBuilder, FormGroup } from "@angular/forms";
import { setMetadataGroup } from "../functions/setMetadataGroup";

@Directive()
export abstract class SettingsFormBase {
  parent = inject(ControlContainer);
  fb = inject(FormBuilder);
  settingsGroup: FormGroup;

  constructor() {
    this.settingsGroup = this.createSettingsGroup();

    setMetadataGroup(this.parent.control, 'settings', this.settingsGroup);
  }

  get fieldOptionsGroup(): FormGroup | null {
    return this.settingsGroup.get('fieldOptions') as FormGroup | null;
  }

  abstract createSettingsGroup(): FormGroup;
}