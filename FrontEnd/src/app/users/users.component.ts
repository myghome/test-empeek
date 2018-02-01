import { Component, OnInit } from '@angular/core';
import  {IUser} from '../common/models/user.model';
import  {UserService} from '../common/services/user.service'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  public users : IUser[] = null;
  public viewUsers : IUser[];
  public load : boolean = true;
  public deleteLoad : boolean = false;
  public addLoad : boolean = false;
  public paginationArray : number[] = [1];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.updateUsers();
  }
  deleteUser(id : number){
    this.deleteLoad = true;
    this.userService.deleteUserById(id).subscribe(res => {
      let index : number = this.users.lastIndexOf(this.users.find(p => p.Id == id ));
      this.users.splice(index,1);
      this.resetPagination()
      this.deleteLoad = false;
    })
  }
  addUser(name : string){
    this.addLoad = true;
    this.userService.addUser(name).subscribe(res => {
      let newUser : IUser = {
        Id : res as number,
        Name : name,
        Pets : []
      }
      this.users.push(newUser);
      this.resetPagination()
      this.addLoad = false;
    })
  }
  updateUsers(){
    this.load = true;
    this.userService.getAllUsers().subscribe(
      res   =>  {
        this.users = res;
        this.paginationInit();
        this.load = false;
      });
  }
  paginationInit (){
    let lenght = this.users.length;
    const range = (end) => {
      let newArray = new Array(end);
      for(var i = 1; i<= end; i++){
        newArray.push(i);
      }
      this.paginationArray = newArray.filter(e => e != null);
    }
    let modulo = lenght % 3;
    let count =  Math.floor(lenght / 3);
    if(count >= 1) {
      this.viewUsers = this.users.slice(0,3);
      (modulo > 0)? range(count +1) : range(count);
    }
    else {
      this.viewUsers = this.users.slice(0,modulo);
    }
  }
  onChangePage(pageNumber){
    let start = (pageNumber-1)*3;
    let end = start+3;
    this.viewUsers = this.users.slice(start,end);
  }
  resetPagination(){
    this.paginationInit();
    this.onChangePage(1);
  }

}
