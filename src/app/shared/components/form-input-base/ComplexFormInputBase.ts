import { OnInit, OnDestroy, Input, inject, Directive } from '@angular/core';
import { FormBuilder, FormGroup, ControlContainer, FormControl, FormArray } from '@angular/forms';
import { SimpleFormInputBase } from './SimpleFormInputBase';

@Directive()
export abstract class ComplexFormInputBase extends SimpleFormInputBase implements OnInit, OnDestroy {
  
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.controlKey,
      this.createControl(this.fb)
    );
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlKey);
  }

  abstract createControl(fb: FormBuilder): FormGroup;
}
