import { Directive, OnInit, OnDestroy, inject, Input } from "@angular/core";
import { ControlContainer, FormGroup, FormControl } from "@angular/forms";

@Directive()
export abstract class SimpleFormInputBase {
  protected parentContainer = inject(ControlContainer);
  @Input({ required: true }) controlKey!: string;
  @Input() label?: string;

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }
}
