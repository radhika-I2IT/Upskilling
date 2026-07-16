import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../service/data-service';
import { TodoApiService } from '../service/todo-api-service';
import { forkJoin } from 'rxjs';
import { AlbumsModel, PostModel, TodosModel, UserModel } from '../app/app.models';
import { ActivatedRoute } from '@angular/router';
import { TitleCasePipe, KeyValuePipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-detail-byid',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-detail-byid.html',
  styleUrl: './user-detail-byid.css',
})
export class UserDetailByid implements OnInit {
   @Input() userId : number = 0;
   @Output() close = new EventEmitter<void>();

    // userId = input<number>();
  userData: UserModel | null | undefined
  display_postList: PostModel[] = [];
  display_albumsList: AlbumsModel[] = [];
  display_todosList: TodosModel[] = [];

  activeTab: string = 'post';

  postList: PostModel[] = [];
  albumsList: AlbumsModel[] = [];
  todosList: TodosModel[] = [];

  constructor(private apiService: TodoApiService,
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute)
    // , private dialog: MatDialogRef<UserDetailByid>,
    // @Inject(MAT_DIALOG_DATA) public userId: number
     { }

  ngOnInit(): void {
    // this.route?.paramMap?.subscribe(params => {
    //   this.userId = Number(params.get('id'));
    // })

    forkJoin({
      users: this.apiService.getUsers(),
      posts: this.apiService.getPosts(),
      albums: this.apiService.getAlbums(),
      todos: this.apiService.getTodos(),
    }).subscribe({
      next: (result: any) => {
        this.dataService.postsData = result.posts;
        this.dataService.usersData = result.users;
        this.dataService.albumsData = result.albums;
        this.dataService.todosData = result.todos;

        this.userData = this.dataService.usersData.find(t => t.id == this.userId);
        this.postList = this.dataService?.postsData.filter(a => a.userId == this.userId)
        this.albumsList = this.dataService?.albumsData.filter(a => a.userId == this.userId)
        this.todosList = this.dataService?.todosData.filter(a => a.userId == this.userId)

        this.display_postList = this.postList.slice(0, 5) ?? [];
        this.display_albumsList = this.albumsList.slice(0, 5) ?? [];
        this.display_todosList = this.todosList.slice(0, 5) ?? [];

        this.dataService?.postsData.filter(a => a.userId == this.userId)

        this.cdr.detectChanges();
      }
    })
  }

  

closeComponent() {
  this.close.emit();
}

  // close() {    
  //   this.dialog.close();
  //  }
}
