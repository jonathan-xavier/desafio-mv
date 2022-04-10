import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../service/item.service';
import { Item } from '../../app/model/item';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.scss']
})


export class FormItemComponent implements OnInit {

  formItem = new FormGroup({
    nome: new FormControl('', [Validators.required]),
  });

  item: Item = null;
  constructor(public itemService: ItemService, private router: Router) { }

  ngOnInit(): void {
    this.itemService.botaoEdit.subscribe(record => {
      if (record !== null) {
        this.item = record;
        console.log(record, 'valor do record');
        this.formItem.get('nome').setValue(record.nome);
      }
    })
  }

  //só fiz o listar de item, falta o create o delete e o update.
  //pra depois fazer o mesmo em colaborador.
  //falta fazer o create

  validation() {
    if (this.formItem.valid) {
      console.log('xablau');
      if (this.item) {
        this.update(this.item);
      } else {

        this.save();
      }
    } else {

      Swal.fire({
        icon: 'error',
        title: 'Deu ruim..',
        text: 'Cadastro não realizado,' +
          'preencha corretamente o campo'
      });
    }
  }

  save() {
    this.item = this.formItem.value;
    this.itemService.createItens(this.item).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Eeeeeba...',
          text: 'Contato criado com sucesso!'
        });
        this.router.navigate(['/lista-item']);

      },
      error => {
        console.log(error);
        this.router.navigate(['/lista-item'])
      }
    )
  }

  update(item: Item) {
    if (this.formItem.valid && this.item.id != null) {
      item.nome = this.formItem.get('nome').value;

      this.itemService.updateItens(item).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: 'Eeeeeba...',
            text: 'Item editado com sucesso!'
          });
          this.router.navigate(['/lista-item']);
        },

        error => {
          Swal.fire({
            title: 'Ooops!',
            text: 'Erro ao editar item',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ooooops',
        text: 'Edição não realizada, preencha corretamente o campo.'
      });

    }
  }

}
