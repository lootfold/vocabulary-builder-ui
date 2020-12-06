import { ACTION, Item } from '../../items-model';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.scss'],
})
export class AddEditItemComponent implements OnInit {
  @Input() item: Item;

  public action: ACTION;
  public form: FormGroup;

  constructor(private client: HttpClient, public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.action = ACTION.ADD;
    this.form = new FormGroup({
      word: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      meaning: new FormControl(null, Validators.required),
    });

    if (this.item) {
      this.action = ACTION.EDIT;
      this.form.controls.word.setValue(this.item.word);
      this.form.controls.meaning.setValue(this.item.meaning);
    }
  }

  public submitForm(): void {
    console.log(`FORM DATA: ${JSON.stringify(this.form.value)}`);
    if (this.form.valid) {
      if (this.action === ACTION.ADD) {
        this.client.post('/api/items', this.form.value).subscribe(
          (response) => {
            console.log(`SUCCESS: ${JSON.stringify(response)}`);
            this.bsModalRef.hide();
          },
          (error) => {
            console.log(`FAILED: ${error}`);
          }
        );
      } else if (this.action === ACTION.EDIT) {
        console.log(`EDIT ITEM ID: ${this.item.id}`);
        this.client
          .put(`/api/items/${this.item.id}`, this.form.value)
          .subscribe(
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
  }

  get wordControl(): AbstractControl {
    return this.form.get('word');
  }

  get meaningControl(): AbstractControl {
    return this.form.get('meaning');
  }
}
