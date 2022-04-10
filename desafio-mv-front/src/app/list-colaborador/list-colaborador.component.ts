import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Colaborador } from '../model/colaborador';
import { ColaboradorService } from '../service/colaborador.service';

@Component({
  selector: 'app-list-colaborador',
  templateUrl: './list-colaborador.component.html',
  styleUrls: ['./list-colaborador.component.scss']
})
export class ListColaboradorComponent implements OnInit {

  colList: Colaborador[] = [];
  filteredItens: Colaborador[] = [];
  filterBy: string = "";
  constructor(private router: Router, public colService: ColaboradorService) { }

  ngOnInit(): void {
    this.getCol();
  }

  getCol() {
    this.colService.getColaboradores().subscribe(
      data => {
        this.colList = data;
        this.filteredItens = this.colList;
        console.log(data);
      },
      error => {
        this.colList = [];
        console.log(error);
      }
    )
  }

  editCol(col: Colaborador) {

    console.log('edit está funcionando', col);
    this.colService.getColaboradorList(col);
    //this.contatosService.updateContact(contatos);
    this.router.navigate(['/cadastro-colaborador']);
  }


  deleteCol(col: Colaborador) {
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
        this.colService.deleteItens(col.cpf).subscribe(
          data => {
            Swal.fire(
              String(data),
            );

            this.getCol();
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
