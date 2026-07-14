import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostModel, UserModel } from '../app/app.models';
import { DataService } from '../service/data-service';

@Component({
  selector: 'app-postby-id',
  imports: [CommonModule, FormsModule],
  templateUrl: './postby-id.html',
  styleUrl: './postby-id.css',
})
export class PostbyId implements OnInit {

  post: PostModel | undefined | null = null;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }
  
  postUserDetail : UserModel | undefined | null = null;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var idValue = Number(params.get('id'));
      this.post = this.dataService.postsData?.find(t => t.id === idValue)?? null;
      this.postUserDetail = this.dataService.usersData.find(t=> t.id == this.post?.userId)??null;
    });
  }

}
