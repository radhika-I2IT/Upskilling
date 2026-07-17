import { inject, Injectable, Service } from '@angular/core';
import { AlbumsModel, PostModel, TodosModel, UserModel, UserRegistrationModel } from '../app/app.models';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    public usersData : Array<UserModel> = [];
    public postsData : Array<PostModel> = [];
    public todosData : Array<TodosModel> = [];
    public albumsData : Array<AlbumsModel> = [];
    public userRegistration : Array<UserRegistrationModel>= [];
}
