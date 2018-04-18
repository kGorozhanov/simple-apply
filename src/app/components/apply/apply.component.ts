import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {LoadApply, ResetApply, SubmitApply} from '../../actions/apply.actions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApplyState} from '../../state/apply.state';
import {Observable} from 'rxjs';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplyComponent implements OnInit, OnDestroy {
  @Select(ApplyState.loading) loading: Observable<boolean>;
  form: FormGroup;

  constructor(private store: Store,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<ApplyComponent>) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      price: ['', [Validators.required]],
      deposit: ['', [Validators.required]]
    });
    this.store.dispatch(new LoadApply())
      .subscribe(() => {
        const application = this.store.selectSnapshot(ApplyState.application);
        if (application) {
          this.form.patchValue(application);
        }
      });
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetApply());
  }

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(new SubmitApply(this.form.value))
        .subscribe(() => {
          if (!this.store.selectSnapshot(ApplyState.hasError)) {
            this.dialogRef.close();
          }
        });
    }
  }
}
