import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostModel, UserModel, AlbmsModel, TodosModel } from '../app/app.models';
import { TodoApiService } from '../service/todo-api-service';
import { DataService } from '../service/data-service';
import { forkJoin, retry } from 'rxjs';

@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent implements OnInit {

  constructor(private apiService: TodoApiService,  private dataService : DataService,
     private cdr: ChangeDetectorRef
  ) { }

  userCount: number = 0;
  postCount: number = 0;
  albumsCount: number = 0;
  todosCount: number = 0;
  displayList: { title: string, count: number }[] =[];

  ngOnInit(): void {
    forkJoin({
      users: this.apiService.getUsers(),
      albums: this.apiService.getAlbums(),
      todos: this.apiService.getTodos(),
      posts: this.apiService.getPosts(),
    }).subscribe({
      next: (result: any) => {

        this.dataService.usersData = result.users;
        this.dataService.postsData = result.posts;
        this.dataService.albumsData = result.albums;
        this.dataService.todosData = result.todos;
        
        this.userCount = result.users.length;
        this.postCount = result.posts.length;
        this.albumsCount = result.albums.length;
        this.todosCount = result.todos.length;

        this.displayList =[];
        this.displayList.push({title:'Users',count:this.userCount});
        this.displayList.push({title:'Posts',count:this.postCount});
        this.displayList.push({title:'Albums',count:this.albumsCount});
        this.displayList.push({title:'Todos',count:this.todosCount});
        this.cdr.detectChanges();
      }
    })
  }
}
