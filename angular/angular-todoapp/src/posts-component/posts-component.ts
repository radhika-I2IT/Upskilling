import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostModel, UserModel } from '../app/app.models';
import { ActivatedRoute } from '@angular/router';
import { TodoApiService } from '../service/todo-api-service';
import { DataService } from '../service/data-service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-post-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './posts-component.html',
  styleUrl: './posts-component.css',
})
export class PostsComponent implements OnInit {
  postList: PostModel[] = [];
  searchText: string = "";
  constructor(private route: ActivatedRoute,
    private apiService: TodoApiService,
    private dataService: DataService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    if (this.dataService.postsData != null && this.dataService.postsData != undefined && this.dataService.postsData?.length > 0) {
      this.postList = this.dataService?.postsData.sort((a, b) => b.id - a.id).slice(0, 10);
      this.postList.forEach(t => {
        t.userDetail = this.dataService.usersData?.find(x => x.id === t.userId) ?? null;
      })
      this.cdr.detectChanges();
    }
    else {
      forkJoin({
        users: this.apiService.getUsers(),
        posts: this.apiService.getPosts()
      }).subscribe({
        next: (result: any) => {
          this.dataService.postsData = result.posts;
          this.dataService.usersData = result.users;

          this.postList = this.dataService?.postsData.sort((a, b) => b.id - a.id).slice(0, 10);
          this.postList.forEach(t => {
            t.userDetail = this.dataService.usersData?.find(x => x.id === t.userId) ?? null;
          })
          this.cdr.detectChanges();
        }
      })
    }
  }

  searchOnChange(event: any) {
    this.search(event.target.value);
  }

  searchKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.search((event.target as HTMLInputElement).value);
    }
    if (event.key === "Backspace" || event.key === "Delete" || event.key === " ") {
      this.search((event.target as HTMLInputElement).value);

    }
  }
  search(findText: any) {
    if (findText != null && findText != undefined && findText?.length >= 3) {
      this.postList = this.dataService?.postsData?.filter(t => t.title.includes(findText) || t.id.toString().includes(findText) || t.userDetail?.name.includes(findText) || t.body.includes(findText))?.sort((a, b) => b.id - a.id) ?? [];
    }
    else {
      this.postList = this.dataService?.postsData.sort((a, b) => b.id - a.id).slice(0,10) ?? [];
    }
    this.postList.forEach(t => {
      t.userDetail = this.dataService.usersData?.find(x => x.id === t.userId) ?? null;
    })
     this.cdr.detectChanges();
  }
  clear(){
    this.searchText=''; 
      this.postList = this.dataService?.postsData.sort((a, b) => b.id - a.id).slice(0,10) ?? []; 
    this.postList.forEach(t => {
      t.userDetail = this.dataService.usersData?.find(x => x.id === t.userId) ?? null;
    })
  }

}
