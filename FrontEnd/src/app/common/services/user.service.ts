import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IUser } from '../models/user.model'

import { Headers, RequestOptions, Response} from '@angular/http';


@Injectable()
export class UserService {

  private hostName: string ="http://localhost:8080/";

  constructor(private http : HttpClient) {}


  public deletePetById( petId : number){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.delete(this.hostName + "api/Pets/" + petId);
  }
  public addPet( userId : number , name : string){
    let headers = new Headers({ 'Content-Type': 'application/json'});;
    let options = new RequestOptions({headers: headers});
    let body  = {
      userId : userId,
      name : name
    };
    return this.http.post(this.hostName + "api/Pets",JSON.stringify(body));
  }

  public addUser( name : string){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.hostName + "api/Users", JSON.stringify(name), {headers: headers});
  }
  public deleteUserById( userId : number){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.delete(this.hostName + "api/Users?id=" + userId, {headers: headers});
  }
  public getAllUsers():Observable<IUser[]> {
    return this.http.get<IUser[]>(this.hostName + "api/Users");
  }

  public getUserById(userId : number) :Observable<IUser> {
    let headers = new Headers({ 'Content-Type': 'application/json'});;
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.hostName + "api/Users/id?userId=" + userId)
      .map((response: Response) => {
      return <IUser>response.json()
    })
   }
}


