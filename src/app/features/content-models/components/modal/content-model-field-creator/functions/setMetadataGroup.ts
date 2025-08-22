import { AbstractControl, FormGroup } from "@angular/forms";

export function setMetadataGroup(control: AbstractControl | null, key: string, group: FormGroup) {
    const metadata = control?.get('metadata') as FormGroup;

    if (!metadata) {
      throw new Error('Parent form does not contain a metadata group');
    }

    metadata.setControl(key, group);
}