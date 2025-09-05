import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalService } from '@core/components/modal/modal.service';

@Component({
  selector: 'app-content-models',
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './content-models.component.html',
  styleUrl: './content-models.component.css',
  providers: [ModalService]
})
export class ContentModelsComponent {

}
