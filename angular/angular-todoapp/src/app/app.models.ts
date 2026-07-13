export interface UserModel {
  id: number;
  name: string;
  username: string;
  email: string;
  address: [];
  phone: string,
  website: string,
  company: []
}

export interface PostModel {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface TodosModel {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}


export interface AlbmsModel {
  userId: number;
  id: number;
  title: string;
}