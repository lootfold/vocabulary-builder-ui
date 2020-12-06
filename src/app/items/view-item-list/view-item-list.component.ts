import { ViewItemComponent } from '../view-item/view-item.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-view-item-list',
  templateUrl: './view-item-list.component.html',
  styleUrls: ['./view-item-list.component.scss'],
})
export class ViewItemListComponent implements OnInit {
  private _items;
  private bsModalRef: BsModalRef;

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

  public openModal(): void {
    this.bsModalRef = this.modalService.show(AddItemComponent);
    this.modalService.onHide.subscribe(() => {
      this.fetchItems();
    });
  }

  public deleteItem(id: number): void {
    console.log(`DELETE: ${id}`);
    this.httpClient.delete(`/api/items/${id}`).subscribe(
      (response) => {
        console.log(`DELETE SUCCESS`);
        this.fetchItems();
      },
      (error) => console.log(`ERROR: ${error}`)
    );
  }

  public openViewModal(item): void {
    console.log(`VIEW: ${item.id}`);
    const initialState = {
      item: item,
    };
    this.bsModalRef = this.modalService.show(ViewItemComponent, {
      initialState,
    });
  }
}
