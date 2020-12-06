import { Item } from '../items-model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss'],
})
export class ItemModalComponent implements OnInit {
  @Input() public item: Item;

  public showAddEditComponent: boolean;
  public showViewComponent: boolean;

  constructor() {}

  ngOnInit(): void {
    this.showViewComponent = this.item && true;
    this.showAddEditComponent = !this.item && true;
  }

  onEdit() {
    this.showViewComponent = false;
    this.showAddEditComponent = true;
  }
}
