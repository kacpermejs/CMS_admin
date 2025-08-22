import { Directive, inject } from "@angular/core";
import { ControlContainer, FormBuilder, FormGroup } from "@angular/forms";
import { setMetadataGroup } from "../functions/setMetadataGroup";

@Directive()
export class ValidationComponentBase {
  parent = inject(ControlContainer);
  fb = inject(FormBuilder);
  validationGroup: FormGroup;

  constructor() {
    this.validationGroup = this.createValidationGroup();

    setMetadataGroup(this.parent.control, 'validation', this.validationGroup);
  }

  createValidationGroup(): FormGroup {
    return this.fb.group({
      required: [false],
    });
  }
}