import { ItemModalComponent } from '../item-modal/item-modal.component';
import { ACTION, Item } from '../items-model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-item-list',
  templateUrl: './view-item-list.component.html',
  styleUrls: ['./view-item-list.component.scss'],
})
export class ViewItemListComponent implements OnInit {
  private _items;
  public action: ACTION;
  bsModalRef: BsModalRef;

  constructor(
    private httpClient: HttpClient,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  get items() {
    return this._items;
  }

  private fetchItems(): void {
    this.httpClient.get('/api/items').subscribe(
      (response) => {
        this._items = response;
        console.log(this._items);
      },
      (error) => console.log(error)
    );
  }

  public deleteItem(id: number): void {
    console.log(`DELETE: ${id}`);
    this.httpClient.delete(`/api/items/${id}`).subscribe(
      () => {
        console.log(`DELETE SUCCESS`);
        this.fetchItems();
      },
      (error) => console.log(`ERROR: ${error}`)
    );
  }

  public setActionToAdd(): void {
    this.action = ACTION.ADD;
  }

  public setActionToView(): void {
    this.action = ACTION.VIEW;
  }

  public openModal(item: Item): void {
    // console.log(`OPEN MODAL: ${item.id}`);
    const initialState = {
      action: this.action,
      item: item,
    };
    this.bsModalRef = this.modalService.show(ItemModalComponent, {
      initialState,
    });
    this.modalService.onHide.subscribe(() => {
      this.fetchItems();
    });
  }
}
