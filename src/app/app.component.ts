import { Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from './shared/material.module';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { AccountService } from './services/account.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MaterialModule,RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild('sidenav', {static:true}) sidenav!: MatSidenav;

  constructor(private router: Router,public service:AccountService) {
  }

  ngOnInit(): void {
    this.service.checkLogin(); 
  }
  
  toggleSidenav(){
    this.sidenav.toggle();
  }

  logout(){
    if(localStorage.getItem('User'))
    {
      localStorage.removeItem('User');
      this.service.checkLogin();
      this.router.navigateByUrl('login');
    }
  }

}
