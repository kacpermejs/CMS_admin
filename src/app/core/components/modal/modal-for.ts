import { ActivatedRoute } from "@angular/router";

export abstract class ModalFor {
  abstract modalParent(): ActivatedRoute | null;
}
