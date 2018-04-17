import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() loggedIn: boolean;
  @Input() userName: string;
  @Output() logout = new EventEmitter();
  @Output() openLogin = new EventEmitter();
}
