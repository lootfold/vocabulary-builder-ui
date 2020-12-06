import { ACTION } from '../items-model';
import { Item } from '../items-model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss'],
})
export class ItemModalComponent implements OnInit {
  @Input() public action: ACTION;
  @Input() public item: Item;

  constructor() {}

  ngOnInit(): void {}

  get showAddComponent(): boolean {
    return this.action == ACTION.ADD;
  }

  get showViewComponent(): boolean {
    return this.action == ACTION.VIEW;
  }
}
