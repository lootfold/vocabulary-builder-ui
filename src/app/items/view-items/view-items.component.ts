import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.scss'],
})
export class ViewItemsComponent implements OnInit {
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
}
