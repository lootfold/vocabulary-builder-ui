import { Item } from '../items-model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  private fetchItems(): void {
    this.spinner.show();
    this.httpClient.get<Item[]>('/api/items').subscribe(
      (response) => {
        this.items = response;
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
        this.toastrService.error('Oops, Failed to fetch items. :(');
      }
    );
  }

  public deleteItem(id: number): void {
    this.spinner.show();
    this.httpClient.delete(`/api/items/${id}`).subscribe(
      () => {
        this.fetchItems();
        this.spinner.hide();
        this.toastrService.success('Item deleted successfully.');
      },
      () => {
        this.spinner.hide();
        this.toastrService.error('Oops, Failed to delete item. :(');
      }
    );
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
