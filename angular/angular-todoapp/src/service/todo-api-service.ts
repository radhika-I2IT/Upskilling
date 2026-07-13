import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbmsModel, PostModel, TodosModel, UserModel } from '../app/app.models';

@Injectable({
    providedIn: 'root'
})

export class TodoApiService {
    private http = inject(HttpClient);
    private readonly baseURL = 'https://jsonplaceholder.typicode.com';
   
    getUsers(): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(`${this.baseURL}/users`);
        //return this.http.get<UserModel[]>('https://jsonplaceholder.typicode.com/users');
    }

    getPosts(): Observable<PostModel[]> {
        //return this.http.get<PostModel[]>('https://jsonplaceholder.typicode.com/posts');
        return this.http.get<PostModel[]>(`${this.baseURL}/posts`);
    }

    getTodos(): Observable<TodosModel[]> {
         //return this.http.get<TodosModel[]>('https://jsonplaceholder.typicode.com/todos');
        return this.http.get<TodosModel[]>(`${this.baseURL}/todos`);
    }

    getAlbums(): Observable<AlbmsModel[]> {
        //return this.http.get<AlbmsModel[]>('https://jsonplaceholder.typicode.com/albums');
        return this.http.get<AlbmsModel[]>(`${this.baseURL}/albums`);
    }
    
}
