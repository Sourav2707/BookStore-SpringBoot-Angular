import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/login/login.component';
import { CartService } from 'src/app/service/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public totalItem : number = 0;
  public searchTerm !: string;
  username!: string
  constructor(private cartService : CartService, private dialog : MatDialog, public api : ApiService, public user : UserService) { 
    this.user.getUsername().subscribe((username: string) => {
      this.username = username;
    });
  }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    });
    this.user.buttonClicked.subscribe(() => {
      this.handleButtonClick();
    });
  }
  handleButtonClick() {
    this.openLoginDialog();
  }
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px', height: '440px',// Adjust the width as needed
    });
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }
  logout() {
    this.api.logout();
  }
}
