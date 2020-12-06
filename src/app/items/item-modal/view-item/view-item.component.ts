import { Item } from '../../items-model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss'],
})
export class ViewItemComponent implements OnInit {
  @Input() item: Item;
  @Output() edit = new EventEmitter<Item>();

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  onEdit() {
    this.edit.emit(this.item);
  }
}
