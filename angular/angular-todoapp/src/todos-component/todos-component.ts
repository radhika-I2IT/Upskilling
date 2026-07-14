import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodosModel } from '../app/app.models';
import { ActivatedRoute } from '@angular/router';
import { TodoApiService } from '../service/todo-api-service';
import { DataService } from '../service/data-service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-todos-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './todos-component.html',
  styleUrl: './todos-component.css',
})
export class TodosComponent implements OnInit {
  todosList: TodosModel[] = [];
  searchText: string = "";
  status: boolean | null = null ;
  constructor(private route: ActivatedRoute,
    private apiService: TodoApiService,
    private dataService: DataService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    if (this.dataService.postsData != null && this.dataService.postsData != undefined && this.dataService.postsData?.length > 0) {
      this.todosList = this.dataService?.todosData.sort((a, b) => b.id - a.id).slice(0, 10);
      this.todosList.forEach(t => {
        t.userDetail = this.dataService.usersData?.find(x => x.id === t.userId) ?? null;
      })
      this.cdr.detectChanges();
    }
    else {
      forkJoin({
        users: this.apiService.getUsers(),
        todos: this.apiService.getTodos()
      }).subscribe({
        next: (result: any) => {
          this.dataService.todosData = result.todos;
          this.dataService.usersData = result.users;

          this.todosList = this.dataService?.todosData.sort((a, b) => b.id - a.id).slice(0, 10);
          this.todosList.forEach(t => {
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
      this.todosList = this.dataService?.todosData?.filter(t => t.title.includes(findText) || t.id.toString().includes(findText) || t.userDetail?.name.includes(findText))?.sort((a, b) => b.id - a.id) ?? [];
    }
    else {
      this.todosList = this.dataService?.todosData.sort((a, b) => b.id - a.id).slice(0,10) ?? [];
    }
    this.todosList.forEach(t => {
      t.userDetail = this.dataService.usersData?.find(x => x.id === t.userId) ?? null;
    })
    this.cdr.detectChanges();
  }
  clear() {
    this.searchText = '';
    this.todosList = this.dataService?.todosData.sort((a, b) => b.id - a.id).slice(0, 10) ?? [];
    this.todosList.forEach(t => {
      t.userDetail = this.dataService.usersData?.find(x => x.id === t.userId) ?? null;
    })
  }
  toggleStatus(){
    let findText = this.searchText;
    if(findText?.length>=3)
    {
      this.todosList = this.dataService?.todosData?.filter(t => (t.title.includes(findText) || t.id.toString().includes(findText) || t.userDetail?.name.includes(findText)) && t.completed == this.status)
      ?.sort((a, b) => b.id - a.id)?? [];
    }
    else{
      this.todosList =this.dataService?.todosData?.filter(t => t.completed == this.status)?.sort((a, b) => b.id - a.id)?? [];
    }
  }
}
