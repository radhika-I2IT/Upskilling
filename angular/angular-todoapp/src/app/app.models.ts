export interface UserModel {
  id: number;
  name: string;
  username: string;
  email: string;
  address: [];
  phone: string,
  website: string,
  company: Company;
}

export interface Company
{
  name : string;
  catchPhrase : string;
  bs : string;
}
export interface PostModel {
  userId: number;
  id: number;
  title: string;
  body: string;
  userDetail : UserModel | null | undefined
}

export interface TodosModel {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  userDetail : UserModel | null | undefined
}


export interface AlbumsModel {
  userId: number;
  id: number;
  title: string;
  userDetail : UserModel | null | undefined
}

export class UserRegistrationModel{
  constructor(init?:Partial<UserRegistrationModel>)
  {
    Object.assign(this,init);
  }
  userID : number =0;
  fullName : string ="";
  dob: Date = new Date();
  gender: Gender = Gender.Male;
  emailId : string ="";
  phoneNo : string = "";
  password : string ="";
  livinginChennai :  boolean = false;
  termsandcondition: boolean = false;
}

export enum Gender
{
  Male = 1,
  Female = 2,
  Others = 3
}