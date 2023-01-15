import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: './bank-edit-dialog.component.html',
})
export class BankEditDialogComponent {

  form: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    url: new UntypedFormControl('', []),
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
