import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalService } from '@core/components/modal/modal.service';

@Component({
  selector: 'app-content-entries',
  imports: [CommonModule, RouterModule],
  templateUrl: './content-entries.component.html',
  styleUrl: './content-entries.component.css',
  providers: [ModalService]
})
export class ContentEntriesComponent {

}
