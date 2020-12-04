import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  public form: FormGroup;

  constructor(private client: HttpClient, public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      word: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      meaning: new FormControl(null, Validators.required),
    });
  }

  public submitForm(): void {
    console.log(`FORM DATA: ${JSON.stringify(this.form.value)}`);
    if (this.form.valid) {
      this.client.post('/api/items', this.form.value).subscribe(
        (response) => {
          console.log(`SUCCESS: ${JSON.stringify(response)}`);
          this.bsModalRef.hide();
        },
        (error) => {
          console.log(`FAILED: ${error}`);
        }
      );
    }
  }

  get wordControl(): AbstractControl {
    return this.form.get('word');
  }

  get meaningControl(): AbstractControl {
    return this.form.get('meaning');
  }
}
