import { inject } from "@angular/core";
import { ControlContainer } from "@angular/forms";

export const FORM_INPUT_BASE_VIEW_PROVIDERS = [
  {
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true }),
  },
];
