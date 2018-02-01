export interface IUser {
  Id : number,
  Name : string,
  Pets : IPet[]
}

export interface  IPet{
  Id : number,
  Name : string,
  UserId : number
}
