import { Routes } from "@angular/router";
import { AboutComponent } from "../about-component/about-component";
import { AlbumsComponent } from "../albums-component/albums-component";
import { DashboardComponent } from "../dashboard-component/dashboard-component";
import { PostsComponent } from "../posts-component/posts-component";
import { TodosComponent } from "../todos-component/todos-component";
import { UsersComponent } from "../users-component/users-component";
import { HomeComponent } from "../homecomponent/homecomponent";

export const routes: Routes = [
  {
      path: '',
      component: HomeComponent,
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'users', component: UsersComponent },
        { path: 'posts', component: PostsComponent },
        { path: 'albums', component: AlbumsComponent },
        { path: 'todos', component: TodosComponent },
        { path: 'about', component: AboutComponent }
      ]
  }
];