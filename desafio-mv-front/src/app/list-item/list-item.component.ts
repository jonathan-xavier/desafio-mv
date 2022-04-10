import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Item } from '../model/item';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  itemtList: Item[] = [];
  filteredItens: Item[] = [];
  filterBy: string = "";

  constructor(private router: Router, public itemService: ItemService) { }

  ngOnInit(): void {
    this.getItens();
  }

  getItens() {
    this.itemService.getItens().subscribe(
      data => {
        this.itemtList = data;
        this.filteredItens = this.itemtList;
        console.log(data);
      },
      error => {
        this.itemtList = [];
        console.log(error);
      }
    )
  }

  editItem(item: Item) {

    console.log('edit está funcionando', item);
    this.itemService.getItensList(item);
    //this.contatosService.updateContact(contatos);
    this.router.navigate(['/cadastro-item']);
  }

  deleteItens(item: Item) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Deseja mesmo deletar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemService.deleteItens(item.id).subscribe(
          data => {
            Swal.fire(
              String(data),
            );

            this.getItens();
          }
        )

      }
    });
  }



  criarItem() {

    this.router.navigate(['/cadastro-item']);
  }
  criarColaborador() {
    this.router.navigate(['/cadastro-colaborador']);
  }

}
