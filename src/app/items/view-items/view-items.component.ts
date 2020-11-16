import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.scss'],
})
export class ViewItemsComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  private _items;

  ngOnInit(): void {
    this.httpClient.get('/api/items').subscribe(
      (response) => {
        this._items = response;
        console.log(this._items);
      },
      (error) => console.log(error)
    );
  }

  get items() {
    return this._items;
  }
}
