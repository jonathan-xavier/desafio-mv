import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { Item } from '../model/item';
import { map } from 'rxjs/operators';
import { Colaborador } from '../model/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  api_url = environment.api_url;
  private dataEdit = new BehaviorSubject<Colaborador>(null);
  botaoEdit = this.dataEdit.asObservable();

  constructor(private http: HttpClient) { }

  getColaboradorList(col: Colaborador) {
    this.dataEdit.next(col);
  }
  //buscar itens
  getColaboradores() {
    return this.http.get<Colaborador[]>(this.api_url + 'colaborador').pipe(
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
  createItens(col: Colaborador) {
    return this.http.post<Item>(this.api_url + 'colaborador', col).pipe(
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

  updateItens(col: Colaborador) {
    const id = col.cpf;

    return this.http.put<Colaborador>(this.api_url + 'colaborador/' + id, col).pipe(
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

  deleteItens(id: string) {
    return this.http.delete(this.api_url + 'colaborador/' + id).pipe(
      map(
        itemData => {
          return itemData;
        }
      )
    );
  }

}
