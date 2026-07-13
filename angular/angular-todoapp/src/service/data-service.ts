import { inject, Injectable, Service } from '@angular/core';
import { AlbmsModel, PostModel, TodosModel, UserModel } from '../app/app.models';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    public usersData : Array<UserModel> = [];
    public postsData : Array<PostModel> = [];
    public todosData : Array<TodosModel> = [];
    public albumsData : Array<AlbmsModel> = [];

}
