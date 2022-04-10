import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../model/item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  api_url = environment.api_url;
  private dataEdit = new BehaviorSubject<Item>(null);
  botaoEdit = this.dataEdit.asObservable();


  constructor(private http: HttpClient) { }

  getItensList(itens: Item) {
    this.dataEdit.next(itens);
  }
  //buscar itens
  getItens() {
    return this.http.get<Item[]>(this.api_url + 'item').pipe(
      map(
        data => {
          if (data) {
            return data;
          } else {
            return [];
          }
        }
      )
    );
  }

  //crear itens
  createItens(item: Item) {
    return this.http.post<Item>(this.api_url + 'item', item).pipe(
      map(
        data => {
          if (data) {
            return data;
          } else {
            return [];
          }
        }
      )
    );
  }

  updateItens(item: Item) {
    const id = item.id;

    return this.http.put<Item>(this.api_url + 'item/' + id, item).pipe(
      map(
        itemData => {
          if (itemData) {
            return itemData;
          } else {
            return [];
          }
        }
      )
    );
  }

  deleteItens(id: number) {
    return this.http.delete(this.api_url + 'item/' + id).pipe(
      map(
        itemData => {
          return itemData;
        }
      )
    );
  }

  //encontar por id

}
