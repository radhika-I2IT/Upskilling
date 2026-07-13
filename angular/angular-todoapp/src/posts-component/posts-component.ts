import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './posts-component.html',
  styleUrl: './posts-component.css',
})
export class PostsComponent implements OnInit {
  ngOnInit(): void {
  }
}
