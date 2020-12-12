import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './items-model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private url = '/api/items';

  constructor(private httpClient: HttpClient) {}

  getItems() {
    return this.httpClient.get<Item[]>(this.url);
  }

  addItem(newPost) {
    return this.httpClient.post(this.url, newPost);
  }

  updateItem(id: number, updatedItem) {
    return this.httpClient.put(`${this.url}/${id}`, updatedItem);
  }

  deleteItem(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
