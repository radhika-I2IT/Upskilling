import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbumsModel, PostModel, TodosModel, UserModel } from '../app/app.models';

@Injectable({
    providedIn: 'root'
})

export class TodoApiService {
    private http = inject(HttpClient);
    private readonly baseURL = 'https://jsonplaceholder.typicode.com';
   
    getUsers(): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(`${this.baseURL}/users`); 
    }

    getPosts(): Observable<PostModel[]> { 
        return this.http.get<PostModel[]>(`${this.baseURL}/posts`);
    }

    getTodos(): Observable<TodosModel[]> { 
        return this.http.get<TodosModel[]>(`${this.baseURL}/todos`);
    }

    getAlbums(): Observable<AlbumsModel[]> {        
        return this.http.get<AlbumsModel[]>(`${this.baseURL}/albums`);
    }
    
}
