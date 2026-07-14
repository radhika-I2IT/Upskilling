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