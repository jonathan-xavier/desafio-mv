import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }



  ngOnInit(): void {
    this.putEventsMenu();
  }

  putEventsMenu() {
    const menuDesktop = document.getElementById('menu-desktop');
    const menuModbile = document.getElementById('menu-mobile');
    menuModbile.addEventListener('click', () => {
      menuDesktop.classList.toggle('active');
    });
  }
}
