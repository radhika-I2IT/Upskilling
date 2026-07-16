import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserModel } from '../app/app.models';
import { ActivatedRoute, RouterLinkActive, RouterModule } from '@angular/router';
import { DataService } from '../service/data-service';
import { TodoApiService } from '../service/todo-api-service';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog'; MatDialogModule , private dialog: MatDialog
import { UserDetailByid } from '../user-detail-byid/user-detail-byid';
import { ViewChild } from '@angular/core';
import { AppDialogComponent } from '../app/app-dialog-component/app-dialog-component';

@Component({
  selector: 'app-user-component',
  imports: [CommonModule, FormsModule, RouterModule, RouterLinkActive,AppDialogComponent, UserDetailByid ],
  templateUrl: './users-component.html',
  styleUrl: './users-component.css',
  standalone: true
})
export class UsersComponent implements OnInit {
  userList: UserModel[] = [];
  searchUserText: string = "";
  selectedUserId: number = 0;
  isDetailOpen : boolean = false;


@ViewChild('dialog') dialog!: AppDialogComponent;

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
    if (event.key === "Backspace" || event.key === "Delete" || event.key === " ") {
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
  clear() {
    this.searchUserText = '';
    this.userList = this.dataService?.usersData.sort((a, b) => b.id - a.id).slice(0, 5) ?? [];
  }
  viewUserDetail(userId: number) {
    this.selectedUserId = userId;
    this.isDetailOpen = true;
     this.dialog.open();
    // this.dialog.open(UserDetailByid, {
    //   width: '500px',
    //   height: '600px',
    //   maxWidth: '600px',
    //   maxHeight: '600px',
    //   data: userId,
    //   disableClose: true
    // });
  }

  closeDetails() {
  this.isDetailOpen = false;
}
}
