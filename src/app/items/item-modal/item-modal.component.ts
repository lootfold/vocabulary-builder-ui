import { Item } from '../items-model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss'],
})
export class ItemModalComponent implements OnInit {
  @Input() public item: Item;
  public showAddComponent: boolean;
  public showViewComponent: boolean;

  constructor() {}

  ngOnInit(): void {
    this.showViewComponent = this.item && true;
    this.showAddComponent = !this.item && true;
  }

  onEdit(item: Item) {
    this.showViewComponent = false;
    this.showAddComponent = true;
    console.log(`${JSON.stringify(item)}`);
  }
}
