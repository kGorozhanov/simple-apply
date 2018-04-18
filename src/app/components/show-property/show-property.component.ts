import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserState} from '../../state/user.state';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/internal/operators';
import {AuthDialogService} from '../../services/auth-dialog.service';
import {ApplyDialogService} from '../../services/apply-dialog.service';

@Component({
  selector: 'app-show-property',
  templateUrl: './show-property.component.html',
  styleUrls: ['./show-property.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowPropertyComponent implements OnInit {
  @Select(UserState.userType) userType: Observable<string>;
  showApplyBtn: Observable<boolean>;

  constructor(private store: Store,
              private authDialog: AuthDialogService,
              private applyDialog: ApplyDialogService) {
  }

  ngOnInit() {
    this.showApplyBtn = this.userType
      .pipe(map((userType) => !userType || userType === 'TENANT'));
  }

  checkApplyCanBeOpened() {
    if (!this.store.selectSnapshot(UserState.user)) {
      return this.authDialog.show()
        .afterClosed()
        .pipe(
          filter(doLogin => doLogin),
          filter(() => this.store.selectSnapshot(UserState.userType) === 'TENANT')
        )
        .subscribe(() => this.openApply());
    }
    this.openApply();
  }

  private openApply() {
    this.applyDialog.show();
  }
}
