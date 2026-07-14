import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AlbumsModel } from '../app/app.models';
import { ActivatedRoute } from '@angular/router';
import { TodoApiService } from '../service/todo-api-service';
import { DataService } from '../service/data-service';

@Component({
  selector: 'app-albums-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './albums-component.html',
  styleUrl: './albums-component.css',
})
export class AlbumsComponent implements OnInit{
  albumsList: AlbumsModel [] = [];
  searchText: string = "";
  constructor(private route: ActivatedRoute,
    private apiService: TodoApiService,
    private dataService: DataService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    if (this.dataService.albumsData != null && this.dataService.albumsData != undefined && this.dataService.albumsData?.length > 0) {
      this.albumsList = this.dataService?.albumsData.sort((a, b) => b.id - a.id).slice(0, 10);
      this.albumsList.forEach(t => {
        t.userDetail = this.dataService.usersData?.find(x => x.id === t.userId) ?? null;
      })
      this.cdr.detectChanges();
    }
    else {
      forkJoin({
        users: this.apiService.getUsers(),
        albums: this.apiService.getAlbums()
      }).subscribe({
        next: (result: any) => {
          this.dataService.albumsData = result.albums;
          this.dataService.usersData = result.users;

          this.albumsList = this.dataService?.albumsData.sort((a, b) => b.id - a.id).slice(0, 10);
          this.albumsList.forEach(t => {
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
      this.albumsList = this.dataService?.postsData?.filter(t => t.title.includes(findText) || t.id.toString().includes(findText) || t.userDetail?.name.includes(findText) || t.body.includes(findText))?.sort((a, b) => b.id - a.id) ?? [];
    }
    else {
      this.albumsList = this.dataService?.postsData.sort((a, b) => b.id - a.id).slice(0,10) ?? [];
    }
    this.albumsList.forEach(t => {
      t.userDetail = this.dataService.usersData?.find(x => x.id === t.userId) ?? null;
    })
     this.cdr.detectChanges();
  }
  clear(){
    this.searchText=''; 
      this.albumsList = this.dataService?.postsData.sort((a, b) => b.id - a.id).slice(0,10) ?? []; 
    this.albumsList.forEach(t => {
      t.userDetail = this.dataService.usersData?.find(x => x.id === t.userId) ?? null;
    })
  }
}
