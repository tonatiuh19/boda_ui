import { Component, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loading-mask',
  templateUrl: './loading-mask.component.html',
  styleUrl: './loading-mask.component.css',
})
export class LoadingMaskComponent {
  faHeart = faHeart;
}
