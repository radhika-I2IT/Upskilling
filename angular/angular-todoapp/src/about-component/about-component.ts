import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './about-component.html',
  styleUrl: './about-component.css',
})
export class AboutComponent implements OnInit {
  
  ngOnInit(): void {
  }

}
