import { Component, OnInit } from '@angular/core';
import  {IUser , IPet} from '../common/models/user.model';
import  {UserService} from '../common/services/user.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-details',
  templateUrl: 'userDetails.component.html'
})
export class UserDetailsComponent implements OnInit {
  public user : IUser ;
  public viewPets : IPet[];
  public load : boolean = false;
  public deleteLoad : boolean = false;
  public addLoad : boolean = false;
  public paginationArray : number[] = [1];
  public userid : number;
  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.load = true;
    this.userid = this.route.snapshot.params['id'];
    this.userService.getUserById(this.userid ).subscribe(res => {
      this.user = res;
      this.paginationInit ();
      this.load = false;
    });
  }
  deletePet(id : number){
    this.deleteLoad = true;
    this.userService.deletePetById(id).subscribe(res =>{
      let index : number = this.user.Pets.lastIndexOf(this.user.Pets.find(p => p.Id == id ));
      this.user.Pets.splice(index,1);
      this.resetPagination();
      this.deleteLoad = false;
    })
  }
  addPet(name : string){
    this.addLoad = true;
    let newPet : IPet = {
      Id : 999,
      Name : name,
      UserId : this.userid
    }
    this.userService.addPet(this.userid, name).subscribe(res => {
      this.user.Pets.push(newPet);
      this.resetPagination();
      this.addLoad = false;
    });
  }
  paginationInit (){
    let lenght = this.user.Pets.length;
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
      this.viewPets = this.user.Pets.slice(0,3);
      (modulo > 0)? range(count +1) : range(count);
    }
    else {
      this.viewPets = this.user.Pets.slice(0,modulo);
    }
  }
  resetPagination(){
    this.paginationInit();
    this.onChangePage(1);
  }
  onChangePage(pageNumber){
    let start = (pageNumber-1)*3;
    let end = start+3;
    this.viewPets = this.user.Pets.slice(start,end);
  }

}
