import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: './bank-edit-dialog.component.html',
})
export class BankEditDialogComponent {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    url: new FormControl('', []),
  });

  isNew: boolean;

  constructor(
    public dialogRef: MatDialogRef<BankEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isNew = !data.id;

    this.form.patchValue(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.valid) {
      const formValues = this.form.value;
      // todo close after success
      this.dialogRef.close({...this.data, ...formValues});
    }
  }
}
