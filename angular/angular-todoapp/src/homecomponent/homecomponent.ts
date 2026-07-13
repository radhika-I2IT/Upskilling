import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-homecomponent',
  imports: [RouterOutlet,RouterLink,RouterLinkActive, RouterLinkWithHref, CommonModule, FormsModule],
  templateUrl: './homecomponent.html',
  styleUrl: './homecomponent.css',
})
export class HomeComponent implements OnInit {
   
  ngOnInit(): void {   
  }


  
}
