import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { AcStar } from './star';

@Component({
  selector: 'ac-stars',
  template: `
    <div class="stars">
      <ac-star
        *ngFor="let star of stars"
        [active]="star <= rating"
        (rate)="onRate($event)"
        [position]="star"
      >
      </ac-star>
    </div>
  `,
  directives: [AcStar]
})
export class AcStars {
  @Input() starCount: number;
  @Input() rating: number;
  @Input() disable: boolean;
  @Output() rate = new EventEmitter();
  stars:number[] = [1,2,3,4,5];

  constructor() {
    const count = this.starCount < 0 ? 5 : this.starCount;
  }

  onRate(star) {
    if (!this.disable) {
      this.rate.emit(star);
      this.rating = star;
    }
  }
}
