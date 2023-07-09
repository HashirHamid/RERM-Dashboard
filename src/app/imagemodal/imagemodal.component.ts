import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentsComponent } from '../payments/payments.component';

@Component({
  selector: 'app-image-modal',
  template: `
    <img [src]="imageUrl" alt="Enlarged Image">
  `,
})
export class ImageModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  get imageUrl(): string {
    return this.data.imageUrl;
  }
}
