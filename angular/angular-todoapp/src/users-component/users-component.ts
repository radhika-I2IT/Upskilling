import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserModel, PostModel, AlbumsModel, TodosModel } from '../app/app.models';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data-service';
import { TodoApiService } from '../service/todo-api-service';
import { find } from 'rxjs';

@Component({
  selector: 'app-user-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './users-component.html',
  styleUrl: './users-component.css',
})
export class UsersComponent implements OnInit {
  userList: UserModel[] = [];
  searchUserText:string="";
  constructor(private route: ActivatedRoute,
    private apiService: TodoApiService,
    private dataService: DataService,
    private cdr: ChangeDetectorRef) { }

  postUserDetail: UserModel | undefined | null = null;
  ngOnInit(): void {

    if (this.dataService.usersData != null && this.dataService.usersData != undefined && this.dataService.usersData?.length > 0) {
      this.userList = this.dataService?.usersData.sort((a, b) => b.id - a.id);
      this.cdr.detectChanges();
    }
    else {
      this.apiService.getUsers().subscribe({
        next: (result: any) => {
          this.dataService.usersData = result;
          this.userList = this.dataService?.usersData.sort((a, b) => b.id - a.id);
          this.cdr.detectChanges();
        }
      })
    }

    // this.route.paramMap.subscribe(params => {
    //   var idValue = Number(params.get('id'));
    //   this.post = this.dataService.postsData?.find(t => t.id === idValue)?? null;
    //   this.postUserDetail = this.dataService.usersData.find(t=> t.id == this.post?.userId)??null;
    // });
  }
  userSearchOnChange(event: any) {
    this.search(event.target.value);
  } 

  userSearchKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.search((event.target as HTMLInputElement).value);
    }
    if(event.key === "Backspace" || event.key === "Delete" || event.key === " ")
    {
       this.search((event.target as HTMLInputElement).value);
      
    }
  }
  search(findText: any) {
    if (findText != null && findText != undefined && findText?.length >= 3) {
      this.userList = this.dataService?.usersData?.filter(t => t.name.includes(findText) || t.id.toString().includes(findText) || t.company.name.includes(findText) || t.email.includes(findText))?.sort((a, b) => b.id - a.id) ?? [];      
    }
    else {
      this.userList = this.dataService?.usersData.sort((a, b) => b.id - a.id) ?? [];
    }
  }
  clear()
  {
    this.searchUserText='';
     this.userList = this.dataService?.usersData.sort((a, b) => b.id - a.id).slice(0,5) ?? [];
  }
}
