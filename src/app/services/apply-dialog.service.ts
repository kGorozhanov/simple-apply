import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ApplyComponent} from '../components/apply/apply.component';

@Injectable()
export class ApplyDialogService {
  private config: MatDialogConfig = {
    width: '700px'
  } as MatDialogConfig;

  constructor(private dialog: MatDialog) {
  }

  show(): MatDialogRef<ApplyComponent> {
    return this.dialog.open(ApplyComponent, this.config);
  }
}
