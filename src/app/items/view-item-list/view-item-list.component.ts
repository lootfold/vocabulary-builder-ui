import { Item } from '../items-model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ItemModalComponent } from '../item-modal/item-modal.component';

@Component({
  selector: 'app-view-item-list',
  templateUrl: './view-item-list.component.html',
  styleUrls: ['./view-item-list.component.scss'],
})
export class ViewItemListComponent implements OnInit {
  public items: Item[];
  public bsModalRef: BsModalRef;

  constructor(
    private httpClient: HttpClient,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  private fetchItems(): void {
    this.httpClient.get<Item[]>('/api/items').subscribe((response) => {
      this.items = response;
    });
  }

  public deleteItem(id: number): void {
    this.httpClient.delete(`/api/items/${id}`).subscribe(() => {
      this.fetchItems();
    });
  }

  public openModal(item: Item): void {
    const initialState = {
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
