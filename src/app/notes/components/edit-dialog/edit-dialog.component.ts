import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: './edit-dialog.component.html',
})
export class EditDialogComponent {

  form: UntypedFormGroup = new UntypedFormGroup({
    title: new UntypedFormControl('', [Validators.required]),
    text: new UntypedFormControl('', [Validators.required]),
    description: new UntypedFormControl(''),
    keywords: new UntypedFormControl(''), // TODO create plate component
  });

  isNew: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isNew = !data.id;

    this.form.patchValue({...data, keywords: data.keywords ? data.keywords.join(',') : ''});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.valid) {
      const formValues = this.form.value;
      formValues.keywords = formValues.keywords.split(',').map(v => v.trim());
      this.dialogRef.close({...this.data, ...formValues});
    }
  }
}
